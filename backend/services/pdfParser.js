import pdf from "@cedrugs/pdf-parse";

export const extractPdfText = async (buffer) => {
    try {
        const data = await pdf(buffer);
        return data.text;
    } catch (error) {
        console.error(error);
        throw new Error("Unable to parse PDF");
    }
};