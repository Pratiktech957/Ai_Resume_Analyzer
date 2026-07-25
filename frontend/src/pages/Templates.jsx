// pages/Templates.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Templates = () => {
  const templates = [
    { name: 'Modern', color: 'from-blue-500 to-indigo-500', popular: true, description: 'Clean and contemporary design' },
    { name: 'Professional', color: 'from-gray-600 to-gray-800', popular: false, description: 'Traditional corporate style' },
    { name: 'Minimal', color: 'from-emerald-500 to-teal-500', popular: false, description: 'Simple and elegant' },
    { name: 'Developer', color: 'from-purple-500 to-pink-500', popular: false, description: 'Tech-focused layout' },
    { name: 'Executive', color: 'from-amber-500 to-orange-500', popular: false, description: 'Leadership and management' },
    { name: 'ATS Friendly', color: 'from-cyan-500 to-blue-500', popular: true, description: 'Optimized for ATS systems' },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900">Resume Templates</h1>
        <p className="text-gray-600 mt-2">Choose from premium ATS-friendly templates</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <motion.div key={index} whileHover={{ y: -4 }} className="relative bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${template.color} mb-4 flex items-center justify-center text-white text-2xl font-bold`}>{template.name}</div>
            <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{template.description}</p>
            <div className="flex items-center gap-3 mt-4">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">Use Template</button>
              <button className="px-4 py-2 bg-white/60 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-white hover:border-blue-300 transition-colors">Preview</button>
            </div>
            {template.popular && <span className="absolute -top-2 -right-2 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full">Popular</span>}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Templates;