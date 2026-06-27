// pages/History.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiClock, FiEye, FiDownload, FiTrash2, FiSearch } from 'react-icons/fi';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const historyData = [
    { id: 1, name: 'Software Engineer Resume.pdf', date: '2026-06-24', score: 85, status: 'Completed' },
    { id: 2, name: 'Product Manager Resume.pdf', date: '2026-06-23', score: 72, status: 'In Progress' },
    { id: 3, name: 'Frontend Developer Resume.pdf', date: '2026-06-22', score: 91, status: 'Completed' },
    { id: 4, name: 'Data Scientist Resume.pdf', date: '2026-06-21', score: 68, status: 'In Progress' },
    { id: 5, name: 'DevOps Engineer Resume.pdf', date: '2026-06-20', score: 78, status: 'Completed' },
    { id: 6, name: 'Project Manager Resume.pdf', date: '2026-06-19', score: 82, status: 'Completed' },
  ];

  const filteredData = historyData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'completed') return matchesSearch && item.status === 'Completed';
    if (filter === 'progress') return matchesSearch && item.status === 'In Progress';
    return matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold text-slate-900">History</h1><p className="text-gray-600 mt-2">View your resume analysis history</p></div>
        <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2"><FiDownload size={18} /> Export All</button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search resumes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition placeholder:text-gray-400 text-sm" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setFilter('all')} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/60 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>All</button>
          <button onClick={() => setFilter('completed')} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'completed' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/60 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>Completed</button>
          <button onClick={() => setFilter('progress')} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'progress' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/60 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>In Progress</button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-xl overflow-hidden">
        {filteredData.length === 0 ? (
          <div className="text-center py-12"><div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"><FiFileText size={32} className="text-blue-400" /></div><h3 className="text-xl font-semibold text-slate-900">No Resumes Found</h3><p className="text-gray-500 mt-2">Upload a resume to start analyzing</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="text-left text-xs text-gray-500 border-b border-gray-200/50"><th className="pb-3 font-medium">Resume Name</th><th className="pb-3 font-medium">Date</th><th className="pb-3 font-medium">ATS Score</th><th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Actions</th></tr></thead>
              <tbody>
                {filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100/50 last:border-0 hover:bg-blue-50/20 transition-colors">
                    <td className="py-3"><div className="flex items-center gap-2"><FiFileText className="text-blue-500" size={16} /><span className="text-sm font-medium text-slate-900">{item.name}</span></div></td>
                    <td className="py-3 text-sm text-gray-500">{item.date}</td>
                    <td className="py-3"><span className={`text-sm font-semibold ${item.score >= 80 ? 'text-emerald-500' : item.score >= 70 ? 'text-amber-500' : 'text-red-500'}`}>{item.score}%</span></td>
                    <td className="py-3"><span className={`text-xs px-3 py-1 rounded-full ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{item.status}</span></td>
                    <td className="py-3"><div className="flex items-center gap-2"><button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors group"><FiEye size={16} className="text-gray-400 group-hover:text-blue-600" /></button><button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors group"><FiDownload size={16} className="text-gray-400 group-hover:text-blue-600" /></button><button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group"><FiTrash2 size={16} className="text-gray-400 group-hover:text-red-500" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {filteredData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-slate-900">{filteredData.length}</p><p className="text-sm text-gray-500">Total Resumes</p></div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-emerald-600">{filteredData.filter(d => d.status === 'Completed').length}</p><p className="text-sm text-gray-500">Completed</p></div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-amber-600">{filteredData.filter(d => d.status === 'In Progress').length}</p><p className="text-sm text-gray-500">In Progress</p></div>
        </motion.div>
      )}
    </div>
  );
};

export default History;