console.log("✅ NEW resumeController LOADED");
import Resume from "../models/Resume.js";

import { extractPdfText } from "../services/pdfParser.js";
import r2 from "../config/r2.js";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { analyzeResume } from "../services/aiService.js";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume.",
            });
        }

        console.log("1️⃣ File Received");

        const fileExtension = req.file.originalname
            .split(".")
            .pop()
            .toLowerCase();

        const fileName = `${Date.now()}-${req.file.originalname}`;

        console.log("2️⃣ Uploading to Cloudflare R2...");

        await r2.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET,
                Key: fileName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            })
        );

        console.log("3️⃣ Uploaded Successfully to R2");

        let extractedText = "";

        if (fileExtension === "pdf") {
            console.log("4️⃣ Parsing PDF...");

            extractedText = await extractPdfText(req.file.buffer);

            console.log("5️⃣ PDF Parsed Successfully");
            console.log("Extracted Text Length:", extractedText.length);
        }

        console.log("6️⃣ Saving Resume to MongoDB...");
        console.log("6️⃣ Analyzing Resume with AI...");

        const aiAnalysis =
            await analyzeResume(extractedText);

        console.log("7️⃣ AI Analysis Complete");
        const resume = await Resume.create({
            originalName: req.file.originalname,
            objectKey: fileName,
            fileType: fileExtension,
            fileSize: req.file.size,
            extractedText,
            analysis: aiAnalysis
        });

        console.log("7️⃣ Resume Saved Successfully");

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully.",
            resume
        });

    } catch (error) {

        if (error.$metadata) {
            console.error("AWS Metadata:", error.$metadata);
        }

        console.error(error);
        console.error(error.stack);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};