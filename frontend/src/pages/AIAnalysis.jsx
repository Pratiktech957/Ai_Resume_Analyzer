// pages/AIAnalysis.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTrendingUp, FiCheckCircle, FiAlertCircle, FiClock, 
  FiDownload, FiShare2, FiBookmark, FiStar, FiAward,
  FiBarChart2, FiPieChart, FiActivity, FiZap, FiCpu,
  FiFileText, FiBriefcase, FiUsers, FiCalendar,
  FiArrowRight, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ComposedChart, Area
} from 'recharts';

const AIAnalysis = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);

  const scoreData = [
    { category: 'ATS Score', value: 85, fullMark: 100 },
    { category: 'Skills', value: 90, fullMark: 100 },
    { category: 'Formatting', value: 85, fullMark: 100 },
    { category: 'Keywords', value: 80, fullMark: 100 },
    { category: 'Content', value: 75, fullMark: 100 },
    { category: 'Readability', value: 88, fullMark: 100 },
  ];

  const monthlyData = [
    { month: 'Jan', score: 65, applications: 12 },
    { month: 'Feb', score: 70, applications: 15 },
    { month: 'Mar', score: 72, applications: 18 },
    { month: 'Apr', score: 78, applications: 22 },
    { month: 'May', score: 82, applications: 28 },
    { month: 'Jun', score: 85, applications: 35 },
  ];

  const skillMatchData = [
    { skill: 'JavaScript', match: 85 },
    { skill: 'React', match: 80 },
    { skill: 'Python', match: 75 },
    { skill: 'TypeScript', match: 70 },
    { skill: 'Node.js', match: 65 },
    { skill: 'Docker', match: 55 },
    { skill: 'AWS', match: 50 },
  ];

  const suggestions = [
    {
      id: 1,
      title: 'Add Summary Section',
      description: 'A strong summary at the top of your resume helps recruiters quickly understand your value proposition.',
      priority: 'High',
      impact: '+15% ATS Score',
      icon: <FiFileText />,
      details: 'Include 3-4 sentences highlighting your key achievements, years of experience, and career goals.'
    },
    {
      id: 2,
      title: 'Add Quantifiable Achievements',
      description: 'Numbers and metrics make your achievements more impactful and credible to hiring managers.',
      priority: 'High',
      impact: '+20% ATS Score',
      icon: <FiBarChart2 />,
      details: 'Use specific numbers like "Increased sales by 25%" or "Managed a team of 15 people".'
    },
    {
      id: 3,
      title: 'Improve Keywords',
      description: 'Industry-specific keywords help your resume pass through ATS filters more easily.',
      priority: 'Medium',
      impact: '+10% ATS Score',
      icon: <FiTrendingUp />,
      details: 'Research job descriptions in your field and include relevant keywords like "Agile", "Scrum", "Leadership".'
    },
    {
      id: 4,
      title: 'Use Action Verbs',
      description: 'Strong action verbs make your experience sound more impressive and dynamic.',
      priority: 'High',
      impact: '+12% ATS Score',
      icon: <FiActivity />,
      details: 'Replace passive phrases with active verbs like "Led", "Developed", "Implemented", "Designed".'
    },
    {
      id: 5,
      title: 'Add Projects Section',
      description: 'Showcase your practical experience and skills through relevant projects.',
      priority: 'Medium',
      impact: '+8% ATS Score',
      icon: <FiBriefcase />,
      details: 'Include 2-3 projects that demonstrate your skills with clear outcomes and technologies used.'
    },
  ];

  const toggleSuggestion = (id) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Analysis</h1>
          <p className="text-gray-600 mt-2">Deep insights and recommendations for your resume</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white/60 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-white hover:border-blue-300 transition-all duration-300 flex items-center gap-2">
            <FiDownload size={18} /> Export Report
          </button>
          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2">
            <FiZap size={18} /> Re-analyze
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 border-b border-gray-200/50 pb-4"
      >
        {['overview', 'skills', 'keywords', 'suggestions', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-gray-500">Overall Score</p><p className="text-3xl font-bold text-emerald-500 mt-1">85%</p><p className="text-xs text-emerald-500 mt-1">↑ 5% this month</p></div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500"><FiAward size={24} /></div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-gray-500">Skills Match</p><p className="text-3xl font-bold text-blue-600 mt-1">90%</p><p className="text-xs text-emerald-500 mt-1">↑ 3% this month</p></div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><FiUsers size={24} /></div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-gray-500">Keywords Found</p><p className="text-3xl font-bold text-purple-600 mt-1">32</p><p className="text-xs text-emerald-500 mt-1">↑ 8 this month</p></div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600"><FiFileText size={24} /></div>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div><p className="text-sm text-gray-500">Applications</p><p className="text-3xl font-bold text-amber-600 mt-1">35</p><p className="text-xs text-emerald-500 mt-1">↑ 12 this month</p></div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600"><FiBriefcase size={24} /></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Score Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }} />
                    <Legend />
                    <Area type="monotone" dataKey="score" fill="#3B82F6" stroke="#3B82F6" strokeWidth={2} fillOpacity={0.2} />
                    <Bar dataKey="applications" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Skill Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={scoreData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="category" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9CA3AF" />
                    <Radar name="Score" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)', backdropFilter: 'blur(10px)' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Top AI Suggestions</h3>
              <button onClick={() => setActiveTab('suggestions')} className="text-sm text-blue-600 font-medium hover:text-blue-700">View All →</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.slice(0, 4).map((suggestion) => (
                <div key={suggestion.id} className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">{suggestion.icon}</div>
                  <div><p className="text-sm font-medium text-slate-900">{suggestion.title}</p><p className="text-xs text-gray-500 mt-1">{suggestion.impact}</p></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'skills' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Skill Match Analysis</h3>
            <div className="space-y-4">
              {skillMatchData.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{skill.skill}</span>
                    <span className="font-medium">{skill.match}%</span>
                  </div>
                  <div className="w-full bg-gray-200/70 rounded-full h-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${skill.match}%` }} transition={{ duration: 1, delay: index * 0.1 }} className={`h-2 rounded-full ${skill.match >= 80 ? 'bg-emerald-500' : skill.match >= 60 ? 'bg-blue-500' : 'bg-amber-500'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Missing Skills</h3>
            <div className="flex flex-wrap gap-3">
              {['Docker', 'Kubernetes', 'AWS', 'TypeScript', 'GraphQL', 'Redis', 'MongoDB'].map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-red-50/80 text-red-500 text-sm rounded-xl border border-red-100/50">{skill}</span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">Adding these skills could improve your ATS score by up to 15%</p>
          </div>
        </motion.div>
      )}

      {activeTab === 'keywords' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Keyword Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Top Keywords Found</h4>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Python', 'Node.js', 'TypeScript', 'HTML', 'CSS', 'SQL', 'Git', 'REST API'].map((keyword, index) => (
                    <span key={index} className="px-3 py-1.5 bg-emerald-50/80 text-emerald-600 text-sm rounded-full border border-emerald-100/50">{keyword}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Missing Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {['Docker', 'Kubernetes', 'AWS', 'GraphQL', 'Redis', 'Microservices'].map((keyword, index) => (
                    <span key={index} className="px-3 py-1.5 bg-red-50/80 text-red-500 text-sm rounded-full border border-red-100/50">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50">
              <p className="text-sm text-gray-500">Keyword density: <span className="font-medium text-slate-900">3.2%</span> (Optimal range: 2-4%)</p>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'suggestions' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {suggestions.map((suggestion) => (
            <motion.div key={suggestion.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: suggestion.id * 0.1 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleSuggestion(suggestion.id)}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">{suggestion.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs px-3 py-1 rounded-full ${suggestion.priority === 'High' ? 'bg-red-50 text-red-500' : suggestion.priority === 'Medium' ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-500'}`}>{suggestion.priority} Priority</span>
                      <span className="text-xs text-emerald-500 font-medium">{suggestion.impact}</span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                  {expandedSuggestion === suggestion.id ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <AnimatePresence>
                {expandedSuggestion === suggestion.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                      <p className="text-sm text-gray-600 leading-relaxed">{suggestion.details}</p>
                      <button className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl transition-all duration-300">Apply Suggestion</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'history' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Analysis History</h3>
          <div className="space-y-3">
            {[
              { date: '2026-06-24', score: 85, changes: '+5%' },
              { date: '2026-06-20', score: 80, changes: '+3%' },
              { date: '2026-06-15', score: 77, changes: '+2%' },
              { date: '2026-06-10', score: 75, changes: '+4%' },
              { date: '2026-06-05', score: 71, changes: 'Initial' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/40 rounded-xl border border-white/50 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                  <FiClock className="text-gray-400" size={18} />
                  <div><p className="text-sm font-medium text-slate-900">{item.date}</p><p className="text-xs text-gray-500">ATS Score: {item.score}%</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${item.changes !== 'Initial' ? 'text-emerald-500' : 'text-gray-500'}`}>{item.changes}</span>
                  <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIAnalysis;