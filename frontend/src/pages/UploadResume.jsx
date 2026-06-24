// pages/UploadResume.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiFile, FiCheckCircle, FiX } from 'react-icons/fi';

const UploadResume = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...files, e.dataTransfer.files[0]]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles([...files, e.target.files[0]]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900">Upload Resume</h1>
        <p className="text-gray-600 mt-2">Upload your resume for AI analysis and optimization</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl"
      >
        <div
          className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
            dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <FiUpload size={32} className="text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">Drop your resume here</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
              <p className="text-xs text-gray-400 mt-2">Supports PDF, DOCX, TXT (Max 5MB)</p>
            </div>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 cursor-pointer"
            >
              Browse Files
            </label>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Uploaded Files</h3>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-white/50">
                <div className="flex items-center gap-3">
                  <FiFile className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button onClick={() => removeFile(index)} className="p-1 hover:bg-red-50 rounded-lg transition-colors">
                  <FiX size={18} className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {files.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
        >
          Analyze Resume
        </motion.button>
      )}
    </div>
  );
};

export default UploadResume;