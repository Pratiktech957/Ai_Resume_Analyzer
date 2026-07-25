// pages/Profile.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiEdit2, FiLock, FiSave, FiX, FiCamera, FiBriefcase, FiMapPin, FiGlobe } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Amit Kumar',
    email: 'amit@example.com',
    title: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    company: 'Tech Corp',
    bio: 'Passionate about building innovative solutions and helping others succeed in their careers.'
  });
  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => { setIsEditing(true); setEditData({ ...profileData }); };
  const handleSave = () => { setProfileData({ ...editData }); setIsEditing(false); };
  const handleCancel = () => { setIsEditing(false); setEditData({ ...profileData }); };
  const handleChange = (e) => { const { name, value } = e.target; setEditData(prev => ({ ...prev, [name]: value })); };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><h1 className="text-3xl font-bold text-slate-900">Profile</h1><p className="text-gray-600 mt-2">Manage your profile information</p></motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg">{profileData.name.charAt(0)}</div>
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-colors"><FiCamera size={16} /></button>
          </div>

          <div className="flex-1 space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" name="name" value={editData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" name="email" value={editData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" name="title" value={editData.title} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input type="text" name="location" value={editData.location} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Company</label><input type="text" name="company" value={editData.company} onChange={handleChange} className="w-full px-4 py-2.5 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Bio</label><textarea name="bio" value={editData.bio} onChange={handleChange} rows="3" className="w-full px-4 py-2.5 bg-white/60 border border-gray-200/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition resize-none" /></div>
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2"><FiSave size={16} /> Save Changes</button>
                  <button onClick={handleCancel} className="px-6 py-2.5 bg-white/60 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-white hover:border-red-300 hover:text-red-600 transition-colors flex items-center gap-2"><FiX size={16} /> Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div><label className="block text-sm font-medium text-gray-700">Full Name</label><div className="flex items-center gap-2 mt-1"><FiUser className="text-gray-400" size={18} /><span className="text-slate-900 font-medium">{profileData.name}</span></div></div>
                <div><label className="block text-sm font-medium text-gray-700">Email</label><div className="flex items-center gap-2 mt-1"><FiMail className="text-gray-400" size={18} /><span className="text-slate-900">{profileData.email}</span></div></div>
                <div><label className="block text-sm font-medium text-gray-700">Title</label><div className="flex items-center gap-2 mt-1"><FiBriefcase className="text-gray-400" size={18} /><span className="text-slate-900">{profileData.title}</span></div></div>
                <div><label className="block text-sm font-medium text-gray-700">Location</label><div className="flex items-center gap-2 mt-1"><FiMapPin className="text-gray-400" size={18} /><span className="text-slate-900">{profileData.location}</span></div></div>
                <div><label className="block text-sm font-medium text-gray-700">Company</label><div className="flex items-center gap-2 mt-1"><FiGlobe className="text-gray-400" size={18} /><span className="text-slate-900">{profileData.company}</span></div></div>
                <div><label className="block text-sm font-medium text-gray-700">Bio</label><p className="text-slate-900 mt-1">{profileData.bio}</p></div>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200/50">
                  <button onClick={handleEdit} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-2"><FiEdit2 size={16} /> Edit Profile</button>
                  <button className="px-6 py-2.5 bg-white/60 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex items-center gap-2"><FiLock size={16} /> Change Password</button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg text-center"><p className="text-3xl font-bold text-blue-600">12</p><p className="text-sm text-gray-500 mt-1">Resumes Analyzed</p></div>
        <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg text-center"><p className="text-3xl font-bold text-emerald-600">85%</p><p className="text-sm text-gray-500 mt-1">Average ATS Score</p></div>
        <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-lg text-center"><p className="text-3xl font-bold text-purple-600">24</p><p className="text-sm text-gray-500 mt-1">Job Matches</p></div>
      </motion.div>
    </div>
  );
};

export default Profile;