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

export default UploadResume;