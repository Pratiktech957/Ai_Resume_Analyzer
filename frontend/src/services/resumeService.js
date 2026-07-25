import axios from "axios";

export const uploadResume = async (file) => {
    const formData = new FormData();

    formData.append("resume", file);

    return axios.post("/api/resume/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};