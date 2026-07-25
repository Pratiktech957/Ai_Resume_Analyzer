import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Resume Analyzer API Running 🚀",
    });
});

app.use("/api/resume", resumeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.log("========== GLOBAL ERROR ==========");
    console.dir(err, { depth: null });

    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});