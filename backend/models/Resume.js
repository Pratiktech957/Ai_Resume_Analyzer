import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        originalName: {
            type: String,
            required: true,
            trim: true,
        },

        objectKey: {
            type: String,
            required: true,
        },

        fileType: {
            type: String,
            enum: ["pdf", "doc", "docx"],
            required: true,
        },

        fileSize: {
            type: Number,
            required: true,
        },

        extractedText: {
            type: String,
            default: "",
        },
        analysis: {
            type: Object,
            default: {}
        },


    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Resume", resumeSchema);