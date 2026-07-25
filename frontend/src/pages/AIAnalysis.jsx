import { useLocation } from "react-router-dom";

function AIAnalysis() {
    const { state } = useLocation();

    const resume = state?.resume;
    const analysis = resume?.analysis;

    if (!resume) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl">
                No Resume Found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-white p-10">

            <h1 className="text-4xl font-bold mb-8">
                🤖 AI Resume Analysis
            </h1>

            {/* Resume Info */}
            <div className="bg-slate-800 rounded-xl p-6 mb-6">

                <h2 className="text-2xl font-semibold mb-4">
                    Resume Information
                </h2>

                <p><strong>File:</strong> {resume.originalName}</p>
                <p><strong>Type:</strong> {resume.fileType}</p>
                <p><strong>Size:</strong> {(resume.fileSize / 1024).toFixed(2)} KB</p>

            </div>

            {/* AI Analysis */}
            {analysis && (
                <div className="bg-slate-800 rounded-xl p-6 mb-6">

                    <h2 className="text-2xl font-semibold mb-6">
                        AI Analysis
                    </h2>

                    <p className="mb-4">
                        <strong>Overall Score:</strong> {analysis.overallScore}/100
                    </p>

                    <div className="mb-6">
                        <h3 className="font-bold text-lg mb-2">Summary</h3>
                        <p>{analysis.summary}</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-lg mb-2">Strengths</h3>
                        <ul className="list-disc pl-5">
                            {analysis.strengths?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-lg mb-2">Weaknesses</h3>
                        <ul className="list-disc pl-5">
                            {analysis.weaknesses?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-lg mb-2">Missing Skills</h3>
                        <ul className="list-disc pl-5">
                            {analysis.missingSkills?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-lg mb-2">Suggestions</h3>
                        <ul className="list-disc pl-5">
                            {analysis.suggestions?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-lg mb-2">Projects Feedback</h3>
                        <ul className="list-disc pl-5">
                            {analysis.projectsFeedback?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-2">ATS Tips</h3>
                        <ul className="list-disc pl-5">
                            {analysis.atsTips?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            )}

            {/* Resume Text */}
            <div className="bg-slate-800 rounded-xl p-6">

                <h2 className="text-2xl font-semibold mb-4">
                    Extracted Resume Text
                </h2>

                <div className="bg-black p-4 rounded-lg h-[500px] overflow-y-auto whitespace-pre-wrap">
                    {resume.extractedText}
                </div>

            </div>

        </div>
    );
}

export default AIAnalysis;