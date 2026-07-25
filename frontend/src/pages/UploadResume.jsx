<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../services/resumeService";

function UploadResume() {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a resume.");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const { data } = await uploadResume(file);
            console.log("API Response:", data);
            console.log("Resume:", data.resume);
            console.log("Analysis:", data.resume.analysis);
            setMessage(data.message);

            // Go to AI Analysis page with backend response
            navigate("/analysis", {
                state: {
                    resume: data.resume,
                },
            });

        } catch (error) {
            console.log(error);

            setMessage(
                error.response?.data?.message || "Upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black py-10">

            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold text-center mb-2">
                    AI Resume Analyzer
                </h1>

                <p className="text-gray-500 text-center mb-6">
                    Upload your resume and get AI-powered insights.
                </p>

                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full mb-5 border rounded-lg p-2"
                />

                {file && (
                    <div className="mb-5 rounded-lg bg-gray-100 p-3">
                        <p className="text-sm">
                            📄 <strong>{file.name}</strong>
                        </p>

                        <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(2)} KB
                        </p>
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold disabled:bg-gray-400"
                >
                    {loading ? "Analyzing Resume..." : "Upload Resume"}
                </button>

                {loading && (
                    <div className="mt-6 flex flex-col items-center">

                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                        <p className="mt-3 text-gray-600">
                            Uploading Resume...
                        </p>

                        <p className="text-sm text-gray-400">
                            Extracting text...
                        </p>

                        <p className="text-sm text-gray-400">
                            AI is analyzing your resume...
                        </p>

                    </div>
                )}

                {message && !loading && (
                    <div className="mt-5 p-3 rounded-lg bg-green-100 text-green-700 text-center">
                        {message}
                    </div>
                )}

            </div>

        </div>
    );
}
=======
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
>>>>>>> 19fd7b06aecc84547822035ab5fd94430cd4ed92

export default UploadResume;