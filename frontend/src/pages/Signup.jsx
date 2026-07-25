// pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, 
  FiShield, FiCheckCircle, FiAlertCircle, FiArrowLeft 
} from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (name === 'name' && !formData.name.trim()) {
      setErrors(prev => ({ ...prev, name: 'Full name is required' }));
    }
    if (name === 'email' && !formData.email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
    } else if (name === 'email' && formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Email is invalid' }));
    }
    if (name === 'password' && !formData.password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
    } else if (name === 'password' && formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
    }
    if (name === 'confirmPassword' && formData.confirmPassword !== formData.password) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      localStorage.setItem('user', JSON.stringify({ 
        name: formData.name, 
        email: formData.email,
        loggedIn: true 
      }));
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthLabel = () => {
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    return labels[passwordStrength - 1] || '';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
    return colors[passwordStrength - 1] || 'bg-gray-200';
  };

  const getPasswordStrengthTextColor = () => {
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-green-500'];
    return colors[passwordStrength - 1] || 'text-gray-400';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-200/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4 text-sm group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={16} />
          Back to Home
        </Link>

        <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl shadow-blue-200/30 rounded-3xl p-8 md:p-10">
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
                Create Account
              </motion.h2>
            </Link>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-sm mt-1.5"
            >
              Start optimizing your resume with AI
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 ml-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="John Doe"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/60 border rounded-xl transition-all duration-200 
                      placeholder:text-gray-400 text-gray-800
                      ${errors.name && touched.name 
                        ? 'border-red-300 ring-4 ring-red-500/10' 
                        : 'border-gray-200/60 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                      }`}
                  />
                  {errors.name && touched.name && (
                    <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-red-500">
                      <FiAlertCircle size={12} />
                      <span>{errors.name}</span>
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
                    onBlur={handleBlur}
                    className={`w-full pl-11 pr-4 py-3.5 bg-white/60 border rounded-xl transition-all duration-200 
                      placeholder:text-gray-400 text-gray-800
                      ${errors.email && touched.email 
                        ? 'border-red-300 ring-4 ring-red-500/10' 
                        : 'border-gray-200/60 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                      }`}
                  />
                  {errors.email && touched.email && (
                    <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-red-500">
                      <FiAlertCircle size={12} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 ml-1">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-11 pr-12 py-3.5 bg-white/60 border rounded-xl transition-all duration-200 
                      placeholder:text-gray-400 text-gray-800
                      ${errors.password && touched.password 
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
                  {errors.password && touched.password && (
                    <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-red-500">
                      <FiAlertCircle size={12} />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>
                
                {formData.password && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 space-y-1.5"
                  >
                    <div className="flex gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength 
                              ? getPasswordStrengthColor() 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className={`${getPasswordStrengthTextColor()} font-medium`}>
                        {passwordStrength > 0 ? getPasswordStrengthLabel() : 'Enter a password'}
                      </span>
                      {passwordStrength >= 3 && (
                        <span className="text-green-500 flex items-center gap-1">
                          <FiCheckCircle size={12} /> Strong password
                        </span>
                      )}
                      {passwordStrength === 0 && formData.password.length > 0 && (
                        <span className="text-red-400">Too weak</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 ml-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-11 pr-12 py-3.5 bg-white/60 border rounded-xl transition-all duration-200 
                      placeholder:text-gray-400 text-gray-800
                      ${errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-300 ring-4 ring-red-500/10' 
                        : 'border-gray-200/60 hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="absolute -bottom-5 left-0 flex items-center gap-1 text-xs text-red-500">
                      <FiAlertCircle size={12} />
                      <span>{errors.confirmPassword}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-xs text-gray-500 bg-blue-50/50 px-4 py-2.5 rounded-xl border border-blue-100/50"
            >
              <FiShield className="text-blue-500" size={14} />
              <span>Your data is secure and encrypted.</span>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
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
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </motion.div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/50"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white/60 backdrop-blur-sm text-xs text-gray-400 font-medium">OR</span>
            </div>
          </div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/70 border border-gray-200/60 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/30 transition-all duration-200 font-medium text-gray-700 text-sm"
              onClick={() => console.log('Google signup')}
            >
              <FaGoogle size={20} />
              Continue with Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/70 border border-gray-200/60 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/30 transition-all duration-200 font-medium text-gray-700 text-sm"
              onClick={() => console.log('GitHub signup')}
            >
              <FaGithub size={20} />
              Continue with GitHub
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-center text-sm text-gray-500 mt-6"
          >
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors">
              Sign In
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;