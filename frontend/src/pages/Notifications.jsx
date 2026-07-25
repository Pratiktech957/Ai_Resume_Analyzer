// pages/Notifications.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, FiCheckCircle, FiAlertCircle, FiInfo, FiX,
  FiClock, FiStar, FiBriefcase, FiFileText,
  FiTrendingUp, FiUsers, FiCalendar, FiTrash2,
  FiCheck, FiMessageSquare, FiShare2
} from 'react-icons/fi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'success', title: 'Interview Match Found!', description: 'Your resume matches 3 new job openings at top tech companies.', time: '5 mins ago', read: false, icon: <FiBriefcase className="text-emerald-500" /> },
    { id: 2, type: 'info', title: 'Resume Successfully Analyzed', description: 'Your resume has been analyzed with AI. Your ATS score improved by 5%.', time: '1 hour ago', read: false, icon: <FiFileText className="text-blue-500" /> },
    { id: 3, type: 'warning', title: 'Premium Feature Available', description: 'Unlock advanced AI analysis, unlimited templates, and priority support.', time: '3 hours ago', read: false, icon: <FiStar className="text-amber-500" /> },
    { id: 4, type: 'success', title: 'ATS Score Improved', description: 'Your resume ATS score increased from 75% to 85% after optimization.', time: '1 day ago', read: true, icon: <FiTrendingUp className="text-emerald-500" /> },
    { id: 5, type: 'info', title: 'New Templates Added', description: '3 new professional resume templates are now available for you to use.', time: '2 days ago', read: true, icon: <FiUsers className="text-purple-500" /> },
    { id: 6, type: 'warning', title: 'Resume Needs Review', description: 'Your resume has some areas that could be improved for better ATS scoring.', time: '3 days ago', read: true, icon: <FiAlertCircle className="text-amber-500" /> },
    { id: 7, type: 'success', title: 'Job Match Found', description: 'A new job match has been found based on your resume and skills.', time: '5 days ago', read: true, icon: <FiCheckCircle className="text-emerald-500" /> },
    { id: 8, type: 'info', title: 'Weekly Report Ready', description: 'Your weekly resume performance report is now available to view.', time: '1 week ago', read: true, icon: <FiCalendar className="text-blue-500" /> },
  ]);

  const [filter, setFilter] = useState('all');

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, read: true } : notif));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getFilteredNotifications = () => {
    if (filter === 'all') return notifications;
    if (filter === 'unread') return notifications.filter(n => !n.read);
    if (filter === 'read') return notifications.filter(n => n.read);
    return notifications;
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold text-slate-900">Notifications</h1><p className="text-gray-600 mt-2">Stay updated with your resume activity and AI insights{unreadCount > 0 && <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{unreadCount} new</span>}</p></div>
        <div className="flex gap-3">
          {unreadCount > 0 && <button onClick={markAllAsRead} className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"><FiCheck size={18} /> Mark All Read</button>}
          {notifications.length > 0 && <button onClick={clearAll} className="px-4 py-2.5 bg-white/60 border border-gray-200 text-red-500 font-medium rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors flex items-center gap-2"><FiTrash2 size={18} /> Clear All</button>}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2 border-b border-gray-200/50 pb-4">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'all' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>All ({notifications.length})</button>
        <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'unread' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>Unread ({unreadCount})</button>
        <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === 'read' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}>Read ({notifications.length - unreadCount})</button>
      </motion.div>

      {filteredNotifications.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-12 text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4"><FiBell size={32} className="text-blue-400" /></div>
          <h3 className="text-xl font-semibold text-slate-900">No Notifications</h3><p className="text-gray-500 mt-2">You're all caught up! Check back later for updates.</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => (
            <motion.div key={notification.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className={`bg-white/60 backdrop-blur-sm border rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${notification.read ? 'border-white/50 opacity-75' : 'border-blue-200/50 bg-blue-50/30'}`}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center flex-shrink-0 shadow-sm">{notification.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div><h4 className="text-lg font-semibold text-slate-900">{notification.title}</h4><p className="text-sm text-gray-600 mt-1">{notification.description}</p></div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>}
                      <button onClick={() => deleteNotification(notification.id)} className="p-1 hover:bg-red-50 rounded-lg transition-colors"><FiX size={16} className="text-gray-400 hover:text-red-500" /></button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-200/50">
                    <div className="flex items-center gap-1 text-xs text-gray-500"><FiClock size={14} /><span>{notification.time}</span></div>
                    {!notification.read && <button onClick={() => markAsRead(notification.id)} className="text-xs text-blue-600 font-medium hover:text-blue-700">Mark as read</button>}
                    <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"><FiMessageSquare size={14} /> Reply</button>
                    <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"><FiShare2 size={14} /> Share</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {notifications.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-slate-900">{notifications.length}</p><p className="text-sm text-gray-500">Total Notifications</p></div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-blue-600">{unreadCount}</p><p className="text-sm text-gray-500">Unread</p></div>
          <div className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-2xl p-4 text-center shadow-lg"><p className="text-2xl font-bold text-emerald-600">{notifications.filter(n => n.type === 'success').length}</p><p className="text-sm text-gray-500">Success Alerts</p></div>
        </motion.div>
      )}
    </div>
  );
};

export default Notifications;