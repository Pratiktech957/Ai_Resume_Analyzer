import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const analyzeResume = async (resumeText) => {

    const prompt = `
You are an ATS Resume Analyzer.

Analyze this resume.

Return ONLY valid JSON.

{
  "overallScore":0,
  "summary":"",
  "strengths":[],
  "weaknesses":[],
  "missingSkills":[],
  "suggestions":[],
  "projectsFeedback":[],
  "atsTips":[]
}

Resume:

${resumeText}
`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.2,
        response_format: {
            type: "json_object",
        },
    });

    console.log("========== GROQ RESPONSE ==========");
    console.log(completion.choices[0].message.content);
    console.log("==================================");

    return JSON.parse(
        completion.choices[0].message.content
    );
};

export default groq;