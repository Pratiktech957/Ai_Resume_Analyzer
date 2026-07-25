// pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiLayers, FiDollarSign, FiInfo, FiLogIn, 
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle,
  FiStar, FiTwitter, FiGithub, FiLinkedin, FiYoutube,
  FiArrowRight, FiFileText, FiTrendingUp, FiBarChart2,
  FiBriefcase, FiUsers, FiAward, FiThumbsUp, FiChevronDown,
  FiChevronUp, FiGlobe, FiCamera, FiZap, FiLayout,
  FiHeart, FiShield, FiCpu, FiTarget, FiClock, FiBookOpen,
  FiMessageCircle, FiPhone, FiMapPin, FiMail as FiMailIcon
} from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';

// --- Reusable Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 text-sm';
  const variants = {
    primary: 'bg-blue-600 text-white shadow-lg hover:shadow-blue-200/50 hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-gray-700 hover:text-blue-600 hover:bg-blue-50/30',
    glass: 'bg-white/30 backdrop-blur-md border border-white/30 text-gray-700 hover:bg-white/50',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl shadow-blue-100/20 rounded-3xl ${className}`}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, align = 'center' }) => (
  <div className={`max-w-3xl mx-auto ${align === 'center' ? 'text-center' : ''}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-4 text-lg text-gray-600"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Navbar ---

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const links = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'features', label: 'Features', href: '#features' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'details', label: 'Our Details', href: '#details' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    if (onLogout) onLogout();
  };

  return (
    <motion.nav 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/30 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Clickable to Home */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
              AI
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
              ResumeAI
            </span>
          </Link>

          {/* Desktop Links with Scroll */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-sm">
                    <FiLayout className="mr-2" /> Dashboard
                  </Button>
                </Link>
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-medium">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                  {user.name || user.email}
                </span>
                <Button variant="ghost" className="text-sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-sm">
                    <FiLogIn className="mr-2" /> Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="text-sm">
                    Get Started <FiArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-blue-50">
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1.5 transition-all"></div>
            <div className="w-6 h-0.5 bg-gray-600 transition-all"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-b border-white/30 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                {user ? (
                  <>
                    <Link to="/dashboard">
                      <Button variant="ghost" className="justify-center w-full">
                        <FiLayout className="mr-2" /> Dashboard
                      </Button>
                    </Link>
                    <div className="text-sm text-gray-600 px-2 py-1 text-center">
                      👋 {user.name || user.email}
                    </div>
                    <Button variant="ghost" className="justify-center w-full" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="ghost" className="justify-center w-full">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="primary" className="justify-center w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Hero Section ---
const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm px-4 py-2 rounded-full text-blue-700 text-sm font-medium border border-blue-100/50 mb-6">
              <FiZap className="w-4 h-4" /> AI-Powered Resume Optimization
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.15] tracking-tight">
              Optimize Your <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Resume With AI</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Get ATS score, keyword analysis, AI suggestions, and professional resume templates instantly.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="primary" className="text-base px-8 py-4" onClick={() => navigate('/signup')}>
                <FiFileText className="mr-2" /> Upload Resume
              </Button>
              <Button variant="secondary" className="text-base px-8 py-4">
                Explore Templates <FiArrowRight className="ml-2" />
              </Button>
            </div>
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-500">Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-500">95%</div>
                <div className="text-sm text-gray-500">ATS Accuracy</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">★★★★★</div>
                <span className="text-sm text-gray-600 ml-1">4.9</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Dashboard Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <GlassCard className="p-6 md:p-8 shadow-2xl shadow-blue-200/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-700">ATS Score</h3>
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">Live</span>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-5xl font-bold text-emerald-500">85%</span>
                <span className="text-sm text-gray-400 mb-1">+5% this week</span>
              </div>
              
              <div className="space-y-5 mt-8">
                {[
                  { label: 'Skills', value: 90, color: 'bg-emerald-500' },
                  { label: 'Keywords', value: 80, color: 'bg-blue-500' },
                  { label: 'Formatting', value: 85, color: 'bg-purple-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200/70 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`h-2 rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">AI Suggestions</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">3 new</span>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-emerald-500 mt-0.5" /> Add quantifiable achievements</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-emerald-500 mt-0.5" /> Include more industry keywords</li>
                  <li className="flex items-start gap-2"><FiCheckCircle className="text-emerald-500 mt-0.5" /> Improve formatting consistency</li>
                </ul>
              </div>
            </GlassCard>

            {/* Floating element */}
            <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-md border border-white/50 shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">AI Analyzing...</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Features with Expandable Cards ---
const Features = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const features = [
    {
      id: 0,
      icon: <FiTrendingUp />,
      title: 'AI Resume Analysis',
      shortDesc: 'Get ATS score, keyword analysis, and AI suggestions instantly.',
      longDesc: 'Our advanced AI analyzes your resume against thousands of job descriptions and industry standards. It evaluates your resume for ATS compatibility, identifies missing keywords, checks formatting issues, and provides actionable suggestions to improve your chances of getting interviews. The AI learns from successful resumes and provides personalized recommendations based on your industry and experience level.',
      benefits: [
        'Real-time ATS compatibility scoring',
        'Industry-specific keyword analysis',
        'Formatting and structure optimization',
        'Personalized improvement suggestions',
        'Competitive analysis against industry standards'
      ],
      stats: {
        rating: '4.9',
        users: '25K+',
        success: '94%'
      },
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 1,
      icon: <FiFileText />,
      title: 'ATS Friendly Templates',
      shortDesc: 'Choose from premium, ATS-friendly resume templates.',
      longDesc: 'Our professionally designed templates are optimized for both ATS systems and human recruiters. Each template is carefully crafted to highlight your key achievements while maintaining clean formatting that passes through automated screening systems. Choose from multiple modern designs that work across all industries and experience levels.',
      benefits: [
        'ATS-optimized formatting and structure',
        'Professional designs for every industry',
        'Customizable color schemes and layouts',
        'One-click style updates',
        'PDF export with perfect formatting'
      ],
      stats: {
        rating: '4.8',
        users: '15K+',
        success: '92%'
      },
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      icon: <FiBriefcase />,
      title: 'Job Description Matching',
      shortDesc: 'Compare your resume with job descriptions in seconds.',
      longDesc: 'Simply paste any job description and our AI will instantly compare it with your resume. You\'ll see a detailed match analysis showing which skills and keywords you have, which are missing, and how to optimize your resume for that specific role. This feature helps you tailor your application for each job, significantly increasing your chances of getting selected.',
      benefits: [
        'Instant resume-to-job description matching',
        'Skills gap analysis and recommendations',
        'Keyword coverage percentage tracking',
        'Industry-specific requirement highlighting',
        'Optimization suggestions for each application'
      ],
      stats: {
        rating: '4.7',
        users: '12K+',
        success: '89%'
      },
      color: 'from-emerald-500 to-teal-500'
    },
  ];

  const toggleFeature = (id) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <section id="features" className="py-24 bg-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Powerful Features" 
          subtitle="Everything you need to optimize your resume and land your dream job." 
        />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.id * 0.1 }}
              className="group relative bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-200/40`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-6">{feature.title}</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">{feature.shortDesc}</p>
                
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {expandedFeature === feature.id ? 'Show Less' : 'Learn More'}
                  <motion.div
                    animate={{ rotate: expandedFeature === feature.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-blue-600" />
                  </motion.div>
                </button>
              </div>

              <AnimatePresence>
                {expandedFeature === feature.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-2 border-t border-gray-200/50 space-y-4">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.longDesc}
                      </p>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-900">Key Benefits:</h4>
                        <ul className="space-y-1.5">
                          {feature.benefits.map((benefit, index) => (
                            <motion.li
                              key={index}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-start gap-2 text-xs text-gray-600"
                            >
                              <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={14} />
                              <span>{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="bg-blue-50/50 p-3 rounded-xl text-center">
                          <div className="text-lg font-bold text-blue-600">{feature.stats.rating}</div>
                          <div className="text-xs text-gray-500">Rating</div>
                        </div>
                        <div className="bg-green-50/50 p-3 rounded-xl text-center">
                          <div className="text-lg font-bold text-emerald-600">{feature.stats.users}</div>
                          <div className="text-xs text-gray-500">Users</div>
                        </div>
                        <div className="bg-purple-50/50 p-3 rounded-xl text-center">
                          <div className="text-lg font-bold text-purple-600">{feature.stats.success}</div>
                          <div className="text-xs text-gray-500">Success Rate</div>
                        </div>
                      </div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        onClick={() => window.location.href = '/signup'}
                      >
                        Try Now →
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Trusted By ---
const TrustedBy = () => {
  const stats = [
    { label: 'Users', value: '50K+', icon: <FiUsers /> },
    { label: 'Resumes Analyzed', value: '1M+', icon: <FiFileText /> },
    { label: 'Accuracy', value: '95%', icon: <FiAward /> },
    { label: 'Rating', value: '4.9', icon: <FiStar /> },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-y border-blue-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl text-blue-600 mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials = () => {
  const testimonials = [
    { name: 'Sarah Johnson', role: 'Software Engineer', image: '👩‍💻', text: 'This AI analyzer helped me land interviews at top tech companies. The ATS score was spot on!', stars: 5 },
    { name: 'Michael Chen', role: 'Product Manager', image: '👨‍💼', text: 'The keyword analysis feature is incredible. I optimized my resume and got 3x more callbacks.', stars: 5 },
    { name: 'Emily Rodriguez', role: 'Marketing Director', image: '👩‍💼', text: 'Professional templates and AI suggestions made my resume stand out. Highly recommended!', stars: 5 },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="What Our Users Say" subtitle="Join thousands of job seekers who landed their dream roles." />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-2xl">
                  {t.image}
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
              <div className="flex text-yellow-400 text-sm mb-3">{'★'.repeat(t.stars)}</div>
              <p className="text-gray-600 leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FAQ ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: 'How does the AI resume analysis work?', a: 'Our AI analyzes your resume against ATS standards, checks for keywords, formatting, and provides actionable suggestions to improve your score.' },
    { q: 'What is an ATS score?', a: 'ATS (Applicant Tracking System) score measures how well your resume matches job requirements and passes automated screening systems.' },
    { q: 'Are the templates ATS-friendly?', a: 'Yes, all our templates are designed to be easily parsed by ATS systems while maintaining a professional look.' },
    { q: 'Can I try it for free?', a: 'Absolutely! Start with our Free Plan to analyze your first resume and explore basic features.' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Frequently Asked Questions" subtitle="Got questions? We have answers." />
        <div className="mt-16 space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-medium text-slate-900 hover:bg-blue-50/20 transition-colors"
              >
                <span>{faq.q}</span>
                {openIndex === idx ? <FiChevronUp className="text-blue-600" /> : <FiChevronDown className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Pricing ---
const Pricing = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: 'Free',
      price: '$0',
      desc: 'Perfect for getting started',
      features: ['1 Resume Analysis', 'Basic ATS Score', 'Limited Templates', 'Keyword Suggestions'],
      popular: false,
    },
    {
      name: 'Premium',
      price: '$19',
      desc: 'For serious job seekers',
      features: ['Unlimited Analyses', 'Advanced ATS Score', 'All Templates', 'AI Suggestions', 'Job Matching', 'Priority Support'],
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Choose Your Plan" subtitle="Start optimizing your resume today." />
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative bg-white/80 backdrop-blur-sm border rounded-3xl p-8 shadow-xl ${
                plan.popular ? 'border-blue-500 shadow-blue-200/40 ring-2 ring-blue-500/20' : 'border-white/50'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-3 flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <FiCheckCircle className="text-emerald-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.popular ? 'primary' : 'secondary'} 
                className="w-full mt-8 justify-center"
                onClick={() => navigate('/signup')}
              >
                {plan.popular ? 'Get Started' : 'Try Free'}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- About Section ---
const About = () => {
  return (
    <section id="about" className="py-24 bg-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="About ResumeAI" 
          subtitle="We're on a mission to help everyone land their dream job." 
        />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-2xl mx-auto">
              <FiUsers size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-4">Our Mission</h3>
            <p className="text-gray-600 mt-2">To empower job seekers with AI-powered tools that help them present their best selves to employers.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 text-2xl mx-auto">
              <FiAward size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-4">Our Vision</h3>
            <p className="text-gray-600 mt-2">To become the world's most trusted AI platform for resume optimization and career development.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-2xl mx-auto">
              <FiGlobe size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-4">Our Values</h3>
            <p className="text-gray-600 mt-2">Innovation, Accessibility, and Excellence in everything we do to help you succeed.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Our Details Section (NEW) ---
const OurDetails = () => {
  const details = [
    {
      icon: <FiClock className="text-blue-600" size={24} />,
      title: 'Founded',
      description: 'Established in 2024 with a vision to revolutionize resume optimization.'
    },
    {
      icon: <FiUsers className="text-purple-600" size={24} />,
      title: 'Our Team',
      description: 'A dedicated team of AI experts, career coaches, and product designers.'
    },
    {
      icon: <FiCpu className="text-emerald-600" size={24} />,
      title: 'Technology',
      description: 'Powered by advanced machine learning and natural language processing.'
    },
    {
      icon: <FiTarget className="text-red-500" size={24} />,
      title: 'Our Goal',
      description: 'Help 1 million job seekers land their dream roles by 2026.'
    },
    {
      icon: <FiHeart className="text-pink-500" size={24} />,
      title: 'Our Promise',
      description: '100% satisfaction guarantee with every resume analysis.'
    },
    {
      icon: <FiShield className="text-blue-600" size={24} />,
      title: 'Security',
      description: 'Your data is encrypted and protected with enterprise-grade security.'
    },
    {
      icon: <FiBookOpen className="text-amber-600" size={24} />,
      title: 'Resources',
      description: 'Free resources, guides, and templates to help you succeed.'
    },
    {
      icon: <FiMessageCircle className="text-indigo-600" size={24} />,
      title: 'Support',
      description: '24/7 customer support to help you with any questions.'
    },
  ];

  return (
    <section id="details" className="py-24 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Our Details" 
          subtitle="Learn more about what makes ResumeAI the best choice for your career." 
        />
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center shadow-sm mb-4">
                {detail.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{detail.title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{detail.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-white/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">AI</div>
              <span className="font-bold text-xl text-slate-900">ResumeAI</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs">Optimize your resume with AI-powered analysis and professional templates.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#about" className="hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#details" className="hover:text-blue-600 transition-colors">Our Details</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Resume Analysis</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Templates</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Job Matching</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><FiTwitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><FiGithub size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><FiLinkedin size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors"><FiYoutube size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200/50 text-center text-xs text-gray-400">
          © 2026 ResumeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main Home Component ---
const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30">
      <Navbar user={user} onLogout={handleLogout} />
      <Hero />
      <Features />
      <TrustedBy />
      <Testimonials />
      <Pricing />
      <FAQ />
      <About />
      <OurDetails />
      <Footer />
    </div>
  );
};

export default Home;