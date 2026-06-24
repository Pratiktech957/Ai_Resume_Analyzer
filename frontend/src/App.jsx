// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import AIAnalysis from './pages/AIAnalysis';
import Templates from './pages/Templates';
import JobMatch from './pages/JobMatch';
import InterviewPrep from './pages/InterviewPrep';
import History from './pages/History';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes with Nested Layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Dashboard Home - shows when /dashboard is accessed */}
          <Route index element={<Dashboard />} />
          
          {/* Individual Pages - show when clicked from sidebar */}
          <Route path="upload" element={<UploadResume />} />
          <Route path="analysis" element={<AIAnalysis />} />
          <Route path="templates" element={<Templates />} />
          <Route path="jobmatch" element={<JobMatch />} />
          <Route path="interview" element={<InterviewPrep />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;