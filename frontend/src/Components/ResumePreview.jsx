function ResumePreview({ resume }) {
    if (!resume) return null;

    return (
        <div className="max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
                Resume Details
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <strong>File Name:</strong>
                    <p>{resume.originalName}</p>
                </div>

                <div>
                    <strong>File Type:</strong>
                    <p>{resume.fileType}</p>
                </div>

                <div>
                    <strong>File Size:</strong>
                    <p>{(resume.fileSize / 1024).toFixed(2)} KB</p>
                </div>

                <div>
                    <strong>Storage Key:</strong>
                    <p className="break-all">{resume.objectKey}</p>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-2">
                Extracted Resume Text
            </h3>

            <div className="border rounded-lg p-4 bg-gray-100 h-96 overflow-y-auto whitespace-pre-wrap">
                {resume.extractedText}
            </div>
        </div>
    );
}

export default ResumePreview;