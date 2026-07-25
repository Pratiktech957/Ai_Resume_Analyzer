// pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store login session
    localStorage.setItem('user', JSON.stringify({ 
      email: formData.email,
      name: 'Amit Kumar',
      loggedIn: true 
    }));
    
    setIsLoading(false);
    
    // Navigate to Dashboard after successful login
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // Simulate Google login
    localStorage.setItem('user', JSON.stringify({ 
      email: 'amit.google@example.com',
      name: 'Amit Kumar',
      loggedIn: true 
    }));
    navigate('/dashboard');
  };

  const handleGitHubLogin = () => {
    console.log('GitHub login clicked');
    // Simulate GitHub login
    localStorage.setItem('user', JSON.stringify({ 
      email: 'amit.github@example.com',
      name: 'Amit Kumar',
      loggedIn: true 
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Floating background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back to Home Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4 text-sm group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} />
          Back to Home
        </Link>

        <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl shadow-blue-200/30 rounded-3xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block group">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-xl shadow-blue-500/30 group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300"
              >
                AI
              </motion.div>
            </Link>
            <Link to="/" className="inline-block group">
              <motion.h2 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors"
              >
                Welcome Back
              </motion.h2>
            </Link>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-sm mt-1.5"
            >
              Log in to your resume optimizer
            </motion.p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 ml-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/60 border rounded-xl transition-all duration-200 
                      placeholder:text-gray-400 text-gray-800
                      ${errors.email 
                        ? 'border-red-300 ring-4 ring-red-500/10' 
                        : 'border-gray-200/60 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                      }`}
                  />
                  {errors.email && (
                    <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-red-500">
                      <FiMail size={12} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 ml-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-12 py-3.5 bg-white/60 border rounded-xl transition-all duration-200 
                      placeholder:text-gray-400 text-gray-800
                      ${errors.password 
                        ? 'border-red-300 ring-4 ring-red-500/10' 
                        : 'border-gray-200/60 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                  {errors.password && (
                    <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-red-500">
                      <FiLock size={12} />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Remember me & Forgot password */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between text-sm"
            >
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 w-4 h-4"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium">
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl 
                  shadow-xl shadow-blue-500/30 transition-all duration-200 text-base
                  ${isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-blue-500/40'}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Logging in...
                  </div>
                ) : (
                  'Log In'
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white/60 backdrop-blur-sm text-xs text-gray-400 font-medium">OR</span>
            </div>
          </div>

          {/* Social Buttons */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/70 border border-gray-200/60 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/30 transition-all duration-200 font-medium text-gray-700 text-sm"
            >
              <FaGoogle size={20} />
              Continue with Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGitHubLogin}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/70 border border-gray-200/60 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/30 transition-all duration-200 font-medium text-gray-700 text-sm"
            >
              <FaGithub size={20} />
              Continue with GitHub
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors">
              Sign Up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;