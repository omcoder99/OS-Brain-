import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schoolData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "schoolDatabase.json"), "utf-8")
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const processQuery = async (query, mode) => {
  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

  if (mode === "SCHOOL_KB") {
    const systemPrompt = `
You are "OS Brain", an AI assistant dedicated to PM Shree GSSS Ghantiyali.
Answer user questions STRICTLY using the JSON database provided below.
Maintain a warm, humorous, Hinglish/Hindi-fluent tone, but always keep it respectful.

DATABASE:
${JSON.stringify(schoolData, null, 2)}

Instructions:
1. Provide accurate, friendly, lightly humorous answers.
2. Never mock or demean anyone's appearance or character.
3. If asked outside this context, say you're in "School Knowledge Base Mode".
`;
    const result = await model.generateContent([systemPrompt, query]);
    return {
      text: result.response.text(),
      sources: ["Internal Database: PM Shree GSSS Ghantiyali"],
      badge: "School KB Mode"
    };
  }

  if (mode === "GLOBAL_WEB") {
    const webSystemPrompt = `
You are "OS Brain", a high-speed global AI search assistant.
Provide accurate, detailed answers in Hindi/Hinglish with bullet points and bold headers where useful.
`;
    const result = await model.generateContent([webSystemPrompt, query]);
    return {
      text: result.response.text(),
      sources: ["Google Gemini Search Network"],
      badge: "Global Web Search"
    };
  }

  return { text: "Invalid mode.", sources: [], badge: "Error" };
};
