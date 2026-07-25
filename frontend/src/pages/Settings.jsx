// pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMoon, FiSun, FiMail, FiGlobe, FiLock, FiUser, 
  FiTrash2, FiShield, FiCheckCircle, FiAlertCircle, FiFileText,
  FiBell, FiEye, FiEyeOff, FiSave, FiX
} from 'react-icons/fi';

const Settings = () => {
  // Check localStorage for dark mode preference on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState('English');
  const [privacySettings, setPrivacySettings] = useState({ 
    profileVisibility: 'public', 
    showEmail: false, 
    showResume: true 
  });

  const handlePrivacyChange = (key, value) => { 
    setPrivacySettings(prev => ({ ...prev, [key]: value })); 
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="p-6 space-y-6 dark:text-white transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your account preferences and settings</p>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl dark:shadow-gray-900/30"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Appearance</h3>
        <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50">
          <div className="flex items-center gap-3">
            {darkMode ? 
              <FiMoon className="text-blue-600 dark:text-blue-400" size={20} /> : 
              <FiSun className="text-amber-500" size={20} />
            }
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Toggle dark/light theme</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${darkMode ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl dark:shadow-gray-900/30"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Notifications</h3>
        <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50">
          <div className="flex items-center gap-3">
            <FiMail className="text-blue-600 dark:text-blue-400" size={20} />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Email Notifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
            </div>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${emailNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${emailNotifications ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </motion.div>

      {/* Language */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl dark:shadow-gray-900/30"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Language</h3>
        <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50">
          <div className="flex items-center gap-3">
            <FiGlobe className="text-blue-600 dark:text-blue-400" size={20} />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Language</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Select your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 bg-white/60 dark:bg-gray-700/60 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-sm dark:text-white"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl dark:shadow-gray-900/30"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Privacy Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50">
            <div className="flex items-center gap-3">
              <FiUser className="text-blue-600 dark:text-blue-400" size={20} />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Profile Visibility</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Who can see your profile</p>
              </div>
            </div>
            <select
              value={privacySettings.profileVisibility}
              onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
              className="px-4 py-2 bg-white/60 dark:bg-gray-700/60 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition text-sm dark:text-white"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="connections">Connections Only</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50">
            <div className="flex items-center gap-3">
              <FiShield className="text-blue-600 dark:text-blue-400" size={20} />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Show Email</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Display email on profile</p>
              </div>
            </div>
            <button
              onClick={() => handlePrivacyChange('showEmail', !privacySettings.showEmail)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${privacySettings.showEmail ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${privacySettings.showEmail ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50">
            <div className="flex items-center gap-3">
              <FiFileText className="text-blue-600 dark:text-blue-400" size={20} />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Show Resume</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Display resume on profile</p>
              </div>
            </div>
            <button
              onClick={() => handlePrivacyChange('showResume', !privacySettings.showResume)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${privacySettings.showResume ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${privacySettings.showResume ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Account Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/50 dark:border-gray-700/50 rounded-3xl p-6 shadow-xl dark:shadow-gray-900/30"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account Management</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors group">
            <div className="flex items-center gap-3">
              <FiTrash2 className="text-red-500" size={20} />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">Delete Account</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
              </div>
            </div>
            <FiAlertCircle className="text-red-400" size={18} />
          </button>
          <button className="w-full flex items-center justify-between p-4 bg-white/40 dark:bg-gray-700/40 rounded-xl border border-white/50 dark:border-gray-600/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors group">
            <div className="flex items-center gap-3">
              <FiLock className="text-blue-600 dark:text-blue-400" size={20} />
              <div className="text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">Change Password</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Update your account password</p>
              </div>
            </div>
            <FiCheckCircle className="text-blue-400" size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;