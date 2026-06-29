import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBjM9cbtcrXgocVWGISGlDxUoA6fEJ3ZCY" });

async function run() {
  try {
    console.log("Calling Gemini API...");
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: "Say hello",
    });
    console.log("Success:", response.text);
  } catch (error) {
    console.error("FAILED!");
    console.error(error);
  }
}

run();
