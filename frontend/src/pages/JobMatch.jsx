// pages/JobMatch.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCheckCircle, FiX } from 'react-icons/fi';

const JobMatch = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    if (jobDescription.trim()) {
      setAnalyzed(true);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900">Job Description Matching</h1>
        <p className="text-gray-600 mt-2">Compare your resume with job descriptions</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl">
        <label className="block text-sm font-medium text-gray-700 mb-2">Paste Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full h-48 p-4 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition placeholder:text-gray-400 text-sm"
        />
        <button onClick={handleAnalyze} className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2">
          <FiSearch size={18} /> Analyze Match
        </button>
      </motion.div>

      {analyzed && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Match Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50"><p className="text-4xl font-bold text-blue-600">82%</p><p className="text-sm text-gray-500 mt-2">Overall Match</p></div>
            <div className="text-center p-6 bg-green-50/50 rounded-2xl border border-green-100/50"><p className="text-4xl font-bold text-emerald-600">90%</p><p className="text-sm text-gray-500 mt-2">Keywords Match</p></div>
            <div className="text-center p-6 bg-amber-50/50 rounded-2xl border border-amber-100/50"><p className="text-4xl font-bold text-amber-600">75%</p><p className="text-sm text-gray-500 mt-2">Skills Match</p></div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Missing Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['Docker', 'AWS', 'TypeScript', 'Kubernetes'].map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-red-50 text-red-500 text-xs rounded-full border border-red-100">{skill}</span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default JobMatch;