// pages/InterviewPrep.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiVideo, FiBookOpen, FiCheckCircle, FiArrowRight, FiCalendar, FiZap } from 'react-icons/fi';

const InterviewPrep = () => {
  const topics = [
    { title: 'Common Interview Questions', icon: <FiBookOpen />, progress: 60, questions: 25, completed: 15 },
    { title: 'Technical Interview Practice', icon: <FiMic />, progress: 40, questions: 30, completed: 12 },
    { title: 'Behavioral Questions', icon: <FiVideo />, progress: 30, questions: 20, completed: 6 },
  ];

  const tips = [
    { title: 'Practice your responses', description: 'Practice answering common questions out loud to build confidence.' },
    { title: 'Use the STAR method', description: 'Structure your answers using Situation, Task, Action, Result format.' },
    { title: 'Research the company', description: 'Learn about the company culture, values, and recent achievements.' },
    { title: 'Prepare your questions', description: 'Have thoughtful questions ready to ask the interviewer.' }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Interview Preparation</h1>
          <p className="text-gray-600 mt-2">Prepare for your next interview with AI-powered practice</p>
        </div>
        <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2">
          <FiZap size={18} /> Start Mock Interview
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-blue-600">75</p><p className="text-sm text-gray-500">Total Questions</p></div>
        <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-emerald-600">33</p><p className="text-sm text-gray-500">Completed</p></div>
        <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-purple-600">42</p><p className="text-sm text-gray-500">Remaining</p></div>
        <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-amber-600">44%</p><p className="text-sm text-gray-500">Overall Progress</p></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <motion.div key={index} whileHover={{ y: -4 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-lg">{topic.icon}</div>
            <h3 className="text-lg font-semibold text-slate-900 mt-4">{topic.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500"><span>{topic.completed}/{topic.questions} completed</span><span>•</span><span>{topic.progress}%</span></div>
            <div className="mt-3"><div className="w-full bg-gray-200/70 rounded-full h-2"><div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${topic.progress}%` }} /></div></div>
            <button className="w-full mt-4 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">Continue Practice <FiArrowRight size={16} /></button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-slate-900 mb-4">AI Interview Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 hover:shadow-md transition-all duration-300">
              <FiCheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={20} />
              <div><h4 className="text-sm font-semibold text-slate-900">{tip.title}</h4><p className="text-sm text-gray-600 mt-1">{tip.description}</p></div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-slate-900">Upcoming Practice Sessions</h3><button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button></div>
        <div className="space-y-3">
          {[
            { title: 'Technical Interview Practice', date: 'Today, 3:00 PM', duration: '45 min' },
            { title: 'Behavioral Questions Session', date: 'Tomorrow, 10:00 AM', duration: '30 min' },
            { title: 'Mock Interview with AI', date: 'Jun 28, 2:00 PM', duration: '60 min' },
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/40 rounded-xl border border-white/50 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><FiCalendar size={18} /></div>
                <div><p className="text-sm font-medium text-slate-900">{session.title}</p><p className="text-xs text-gray-500">{session.date} • {session.duration}</p></div>
              </div>
              <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">Join</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewPrep;