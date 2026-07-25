// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiUpload, FiTrendingUp, FiFileText, FiLayout, 
  FiBriefcase, FiCalendar, FiClock, FiBell, FiUser, 
  FiSettings, FiLogOut, FiSearch, FiMoon,
  FiSun, FiChevronDown, FiChevronLeft, FiChevronRight,
  FiStar, FiAward, FiCheckCircle, FiDownload, FiEye, FiTrash2,
  FiCode, FiActivity, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Data
const recentUploads = [
  { id: 1, name: 'Software Engineer Resume.pdf', date: '2026-06-24', score: 85, status: 'Analyzed' },
  { id: 2, name: 'Product Manager Resume.pdf', date: '2026-06-23', score: 72, status: 'Needs Review' },
  { id: 3, name: 'Frontend Developer Resume.pdf', date: '2026-06-22', score: 91, status: 'Optimized' },
  { id: 4, name: 'Data Scientist Resume.pdf', date: '2026-06-21', score: 68, status: 'Needs Review' },
];

const templates = [
  { name: 'Modern', color: 'from-blue-500 to-indigo-500', popular: true },
  { name: 'Professional', color: 'from-gray-600 to-gray-800', popular: false },
  { name: 'Minimal', color: 'from-emerald-500 to-teal-500', popular: false },
  { name: 'Developer', color: 'from-purple-500 to-pink-500', popular: false },
  { name: 'Executive', color: 'from-amber-500 to-orange-500', popular: false },
  { name: 'ATS Friendly', color: 'from-cyan-500 to-blue-500', popular: true },
];

const suggestions = [
  { id: 1, title: 'Add Projects Section', priority: 'High' },
  { id: 2, title: 'Improve Experience Section', priority: 'Medium' },
  { id: 3, title: 'Use Action Verbs', priority: 'High' },
  { id: 4, title: 'Add Achievements', priority: 'Low' },
];

const activities = [
  { id: 1, action: 'Resume Uploaded', time: '2 hours ago', icon: 'upload' },
  { id: 2, action: 'ATS Score Improved', time: '4 hours ago', icon: 'trending' },
  { id: 3, action: 'Template Applied', time: '1 day ago', icon: 'layout' },
  { id: 4, action: 'Job Match Completed', time: '2 days ago', icon: 'briefcase' },
];

const notifications = [
  { id: 1, title: 'Interview Match Found', time: '5 mins ago' },
  { id: 2, title: 'Resume Successfully Analyzed', time: '1 hour ago' },
  { id: 3, title: 'Premium Feature Available', time: '3 hours ago' },
];

const skillData = [
  { name: 'JavaScript', value: 85 },
  { name: 'React', value: 80 },
  { name: 'Python', value: 75 },
  { name: 'TypeScript', value: 70 },
  { name: 'Node.js', value: 65 },
];

const scoreTrendData = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 70 },
  { month: 'Mar', score: 72 },
  { month: 'Apr', score: 78 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 85 },
];

const jobMatchData = [
  { name: 'Jan', matches: 12 },
  { name: 'Feb', matches: 15 },
  { name: 'Mar', matches: 18 },
  { name: 'Apr', matches: 22 },
  { name: 'May', matches: 24 },
  { name: 'Jun', matches: 28 },
];

const COLORS = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

// Check if dark mode is enabled - check both localStorage and class
const isDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    return savedMode === 'true';
  }
  return document.documentElement.classList.contains('dark');
};

// Apply dark mode class to html element
const applyDarkMode = (isDark) => {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('darkMode', String(isDark));
};

// Components
const GlassCard = ({ children, className = '' }) => {
  const dark = isDarkMode();
  return (
    <div className={`${
      dark 
        ? 'bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 shadow-xl shadow-black/30' 
        : 'bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl shadow-blue-100/20'
    } rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

const StatsCard = ({ icon: Icon, label, value, gradient, change }) => {
  const dark = isDarkMode();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`${
        dark 
          ? 'bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 hover:shadow-2xl hover:shadow-black/30' 
          : 'bg-white/60 backdrop-blur-sm border border-white/50 hover:shadow-2xl'
      } rounded-2xl p-6 shadow-lg transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
          <p className={`text-3xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mt-2`}>{value}</p>
          {change && (
            <div className="flex items-center gap-1 mt-2">
              <FiArrowUp className="text-emerald-500" size={14} />
              <span className="text-xs font-medium text-emerald-500">{change}</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl shadow-lg`}>
          <Icon />
        </div>
      </div>
    </motion.div>
  );
};

const CircularProgress = ({ value, label, color }) => {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;
  const dark = isDarkMode();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            className={dark ? 'text-gray-700' : 'text-gray-200'}
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="48"
            cy="48"
          />
          <circle
            className={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="48"
            cy="48"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{value}%</span>
        </div>
      </div>
      <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>{label}</p>
    </div>
  );
};

// Sidebar
const Sidebar = ({ isCollapsed, toggleSidebar, activeTab, setActiveTab, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dark = isDarkMode();

  const menuItems = [
    { id: 'dashboard', icon: FiHome, label: 'Dashboard', path: '/dashboard' },
    { id: 'upload', icon: FiUpload, label: 'Upload Resume', path: '/dashboard/upload' },
    { id: 'analysis', icon: FiTrendingUp, label: 'AI Analysis', path: '/dashboard/analysis' },
    { id: 'templates', icon: FiLayout, label: 'Templates', path: '/dashboard/templates' },
    { id: 'jobmatch', icon: FiBriefcase, label: 'Job Match', path: '/dashboard/jobmatch' },
    { id: 'interview', icon: FiCalendar, label: 'Interview Prep', path: '/dashboard/interview' },
    { id: 'history', icon: FiClock, label: 'History', path: '/dashboard/history' },
    { id: 'notifications', icon: FiBell, label: 'Notifications', path: '/dashboard/notifications' },
  ];

  const bottomMenuItems = [
    { id: 'profile', icon: FiUser, label: 'Profile', path: '/dashboard/profile' },
    { id: 'settings', icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    navigate(item.path);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const allItems = [...menuItems, ...bottomMenuItems];
    const foundItem = allItems.find(item => item.path === currentPath);
    if (foundItem) {
      setActiveTab(foundItem.id);
    } else if (currentPath === '/dashboard') {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={`fixed left-0 top-0 h-full ${
        dark 
          ? 'bg-gray-900/90 backdrop-blur-xl border-r border-gray-700/50 shadow-xl shadow-black/50' 
          : 'bg-white/80 backdrop-blur-xl border-r border-white/30 shadow-xl'
      } z-50 overflow-hidden transition-colors duration-300`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center justify-between px-6 h-20 border-b ${dark ? 'border-gray-700/50' : 'border-gray-200/30'}`}>
          {!isCollapsed ? (
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">AI</div>
              <div>
                <p className={`font-bold text-lg ${dark ? 'text-white' : 'text-slate-900'} group-hover:text-blue-600 transition-colors`}>ResumeAI</p>
                <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Dashboard</p>
              </div>
            </Link>
          ) : (
            <Link to="/dashboard" className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg mx-auto hover:scale-110 transition-transform">AI</Link>
          )}
          <button onClick={toggleSidebar} className={`p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors`}>
            {isCollapsed ? <FiChevronRight size={20} className={dark ? 'text-gray-400' : ''} /> : <FiChevronLeft size={20} className={dark ? 'text-gray-400' : ''} />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : `${dark ? 'text-gray-300 hover:bg-gray-800/50 hover:text-blue-400' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className={`border-t ${dark ? 'border-gray-700/50' : 'border-gray-200/30'} px-4 py-4`}>
          <div className="space-y-1">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : `${dark ? 'text-gray-300 hover:bg-gray-800/50 hover:text-blue-400' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </button>
            ))}
            <button 
              onClick={onLogout} 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200"
            >
              <FiLogOut size={20} />
              {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

// Navbar
const Navbar = ({ isCollapsed, onLogout }) => {
  const [isDark, setIsDark] = useState(isDarkMode());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dark = isDarkMode();

  const toggleDarkMode = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    applyDarkMode(newDark);
  };

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-40 backdrop-blur-xl border-b shadow-sm transition-colors duration-300 ${
        dark 
          ? 'bg-gray-900/90 border-gray-700/50 shadow-black/30' 
          : 'bg-white/70 border-white/30'
      }`}
      style={{ marginLeft: isCollapsed ? 80 : 280 }}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <FiSearch className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? 'text-gray-400' : 'text-gray-400'}`} size={18} />
            <input
              type="text"
              placeholder="Search resumes, templates, jobs..."
              className={`w-full pl-11 pr-4 py-2.5 ${
                dark 
                  ? 'bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400' 
                  : 'bg-white/60 border-gray-200/50 text-gray-800 placeholder-gray-400'
              } border rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-sm`}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors`}
          >
            {isDark ? <FiSun size={20} className="text-amber-500" /> : <FiMoon size={20} className="text-gray-600" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)} 
              className={`p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors relative`}
            >
              <FiBell size={20} className={dark ? 'text-gray-300' : 'text-gray-600'} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>
            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 mt-3 w-80 ${
                    dark 
                      ? 'bg-gray-900/95 backdrop-blur-xl border-gray-700/50' 
                      : 'bg-white/95 backdrop-blur-xl border-white/50'
                  } border rounded-2xl shadow-2xl overflow-hidden`}
                >
                  <div className={`p-4 border-b ${dark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                    <p className={`font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>Notifications</p>
                  </div>
                  <div className="p-2 space-y-1 max-h-72 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`p-3 rounded-xl hover:bg-blue-50/50 dark:hover:bg-gray-800/50 transition-colors`}>
                        <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-slate-900'}`}>{notif.title}</p>
                        <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`p-3 border-t ${dark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                    <button className="w-full text-center text-sm text-blue-600 font-medium hover:text-blue-700">View All Notifications</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className={`flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">A</div>
              <div className="hidden md:block text-left">
                <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>Amit Kumar</p>
                <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>amit@example.com</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full font-medium">Premium</span>
                <FiChevronDown size={16} className={dark ? 'text-gray-400' : 'text-gray-400'} />
              </div>
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute right-0 mt-3 w-64 ${
                    dark 
                      ? 'bg-gray-900/95 backdrop-blur-xl border-gray-700/50' 
                      : 'bg-white/95 backdrop-blur-xl border-white/50'
                  } border rounded-2xl shadow-2xl overflow-hidden`}
                >
                  <div className={`p-4 border-b ${dark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                    <p className={`font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>Amit Kumar</p>
                    <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>amit@example.com</p>
                    <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full font-medium inline-block mt-1">Premium Plan</span>
                  </div>
                  <div className="p-2">
                    <Link to="/dashboard/profile">
                      <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <FiUser size={18} /> Profile
                      </button>
                    </Link>
                    <Link to="/dashboard/settings">
                      <button className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-sm ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <FiSettings size={18} /> Settings
                      </button>
                    </Link>
                    <button 
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors text-sm text-red-500"
                    >
                      <FiLogOut size={18} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Dashboard Content (shown at /dashboard)
const DashboardContent = () => {
  const dark = isDarkMode();

  return (
    <div className="p-6 space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${
          dark 
            ? 'from-blue-900/20 via-indigo-900/20 to-purple-900/20 border-gray-700/50' 
            : 'from-blue-600/10 via-indigo-600/10 to-purple-600/10 border-white/50'
        } backdrop-blur-sm border rounded-3xl p-8 shadow-xl`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Welcome Back, Amit 👋</h1>
            <p className={`${dark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Optimize your resume and get more interviews with AI.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard/upload">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2">
                <FiUpload size={18} /> Upload Resume
              </button>
            </Link>
            <Link to="/dashboard/templates">
              <button className={`px-6 py-3 ${
                dark 
                  ? 'bg-gray-800/60 border-gray-700/50 text-white hover:bg-gray-700/60' 
                  : 'bg-white/60 border-white/50 text-slate-900 hover:bg-white'
              } border font-medium rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center gap-2`}>
                <FiFileText size={18} /> Browse Templates
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={FiFileText} label="Total Resumes" value="12" gradient="from-blue-500 to-indigo-500" change="+3 this month" />
        <StatsCard icon={FiTrendingUp} label="ATS Score" value="85%" gradient="from-emerald-500 to-teal-500" change="+5% this week" />
        <StatsCard icon={FiBriefcase} label="Job Matches" value="24" gradient="from-purple-500 to-pink-500" change="+8 this month" />
        <StatsCard icon={FiAward} label="Interviews Generated" value="8" gradient="from-amber-500 to-orange-500" change="+2 this week" />
      </div>

      {/* Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mb-6`}>Resume Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <CircularProgress value={85} label="ATS Score" color="text-emerald-500" />
              <CircularProgress value={90} label="Skills" color="text-blue-500" />
              <CircularProgress value={85} label="Formatting" color="text-purple-500" />
              <CircularProgress value={80} label="Keywords" color="text-amber-500" />
            </div>
            <div className={`mt-6 pt-6 border-t ${dark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
              <h4 className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'} mb-3`}>AI Suggestions</h4>
              <div className="space-y-2">
                {['Add Summary Section', 'Add Quantifiable Achievements', 'Improve Keywords'].map((suggestion, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 ${
                    dark ? 'bg-blue-900/30 border-blue-800/50' : 'bg-blue-50/50 border-blue-100/50'
                  } rounded-xl border`}>
                    <FiCheckCircle className="text-emerald-500" size={18} />
                    <span className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        <div>
          <GlassCard className="p-6">
            <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>Activity Timeline</h3>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${dark ? 'bg-gray-800/60' : 'bg-white/60'} flex items-center justify-center shadow-sm`}>
                    {activity.icon === 'upload' && <FiUpload className="text-blue-500" />}
                    {activity.icon === 'trending' && <FiTrendingUp className="text-emerald-500" />}
                    {activity.icon === 'layout' && <FiLayout className="text-purple-500" />}
                    {activity.icon === 'briefcase' && <FiBriefcase className="text-amber-500" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-slate-900'}`}>{activity.action}</p>
                    <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Uploads */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Recent Uploads</h3>
          <Link to="/dashboard/history">
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-left text-xs ${dark ? 'text-gray-400' : 'text-gray-500'} border-b ${dark ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <th className="pb-3 font-medium">Resume Name</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">ATS Score</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUploads.map((upload) => (
                <tr key={upload.id} className={`border-b ${dark ? 'border-gray-700/30' : 'border-gray-100/50'} last:border-0`}>
                  <td className={`py-3 text-sm font-medium ${dark ? 'text-white' : 'text-slate-900'}`}>{upload.name}</td>
                  <td className={`py-3 text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{upload.date}</td>
                  <td className="py-3">
                    <span className={`text-sm font-semibold ${upload.score >= 80 ? 'text-emerald-500' : upload.score >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
                      {upload.score}%
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${upload.status === 'Analyzed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : upload.status === 'Optimized' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {upload.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                        <FiEye size={16} className={`${dark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`} />
                      </button>
                      <button className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                        <FiDownload size={16} className={`${dark ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`} />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                        <FiTrash2 size={16} className={`${dark ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Showing 4 of 12 resumes</p>
          <div className="flex gap-2">
            <button className={`p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors`}>
              <FiChevronLeft size={16} className={dark ? 'text-gray-400' : 'text-gray-400'} />
            </button>
            <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm">1</button>
            <button className={`px-3 py-1 rounded-lg ${dark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-blue-50 text-gray-600'} text-sm`}>2</button>
            <button className={`px-3 py-1 rounded-lg ${dark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-blue-50 text-gray-600'} text-sm`}>3</button>
            <button className={`p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors`}>
              <FiChevronRight size={16} className={dark ? 'text-gray-400' : 'text-gray-400'} />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Templates & Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>Resume Templates</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {templates.map((template, index) => (
              <motion.div key={index} whileHover={{ y: -4 }} className={`relative ${dark ? 'bg-gray-800/60' : 'bg-white/60'} rounded-2xl p-4 border ${dark ? 'border-gray-700/50' : 'border-white/50'} shadow-sm hover:shadow-xl transition-all duration-300`}>
                <div className={`w-full h-16 rounded-xl bg-gradient-to-br ${template.color} mb-3`}></div>
                <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{template.name}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="text-xs text-blue-600 font-medium hover:text-blue-700">Preview</button>
                  <button className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded hover:bg-blue-700 transition-colors">Use</button>
                </div>
                {template.popular && (
                  <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full">Popular</span>
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/dashboard/templates">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All Templates →</button>
            </Link>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>AI Suggestions</h3>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <motion.div key={suggestion.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: suggestion.id * 0.1 }} className={`flex items-center justify-between p-4 ${dark ? 'bg-gray-800/60 border-gray-700/50' : 'bg-white/60 border-white/50'} rounded-xl border hover:shadow-lg transition-all duration-300`}>
                <div>
                  <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-slate-900'}`}>{suggestion.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${suggestion.priority === 'High' ? 'bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400' : suggestion.priority === 'Medium' ? 'bg-amber-50 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-green-50 text-green-500 dark:bg-green-900/30 dark:text-green-400'}`}>
                    {suggestion.priority} Priority
                  </span>
                </div>
                <button className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">Apply</button>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/dashboard/analysis">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View Full Analysis →</button>
            </Link>
          </div>
        </GlassCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>Resume Score Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="month" stroke={dark ? '#9CA3AF' : '#9CA3AF'} />
                <YAxis stroke={dark ? '#9CA3AF' : '#9CA3AF'} />
                <Tooltip 
                  contentStyle={{ 
                    background: dark ? '#1F2937' : 'rgba(255,255,255,0.9)',
                    borderRadius: '12px',
                    border: dark ? '1px solid #374151' : '1px solid rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)',
                    color: dark ? '#F3F4F6' : '#111827'
                  }}
                />
                <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>Job Match Graph</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobMatchData}>
                <CartesianGrid strokeDasharray="3 3" stroke={dark ? '#374151' : '#E5E7EB'} />
                <XAxis dataKey="name" stroke={dark ? '#9CA3AF' : '#9CA3AF'} />
                <YAxis stroke={dark ? '#9CA3AF' : '#9CA3AF'} />
                <Tooltip 
                  contentStyle={{ 
                    background: dark ? '#1F2937' : 'rgba(255,255,255,0.9)',
                    borderRadius: '12px',
                    border: dark ? '1px solid #374151' : '1px solid rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)',
                    color: dark ? '#F3F4F6' : '#111827'
                  }}
                />
                <Bar dataKey="matches" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <Link to="/dashboard/jobmatch">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View Job Matching →</button>
            </Link>
          </div>
        </GlassCard>
      </div>

      {/* Skill Distribution */}
      <GlassCard className="p-6">
        <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-slate-900'} mb-4`}>Skill Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={skillData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: dark ? '#1F2937' : 'rgba(255,255,255,0.9)',
                  borderRadius: '12px',
                  border: dark ? '1px solid #374151' : '1px solid rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(10px)',
                  color: dark ? '#F3F4F6' : '#111827'
                }}
              />
              <Legend wrapperStyle={{ color: dark ? '#F3F4F6' : '#111827' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

// Main Dashboard
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const dark = isDarkMode();

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    applyDarkMode(dark);
  }, [dark]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    console.log('Logged out successfully!');
  };

  const isDashboardRoot = location.pathname === '/dashboard';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      dark 
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30'
    }`}>
      <Sidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
      />
      <div style={{ marginLeft: isCollapsed ? 80 : 280 }}>
        <Navbar isCollapsed={isCollapsed} onLogout={handleLogout} />
        {isDashboardRoot ? <DashboardContent /> : <Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;