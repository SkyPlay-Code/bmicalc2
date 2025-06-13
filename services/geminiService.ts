
import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { UnitSystem } from "../types";

const API_KEY = process.env.API_KEY;

export const getHealthInsights = async (
  bmi: number,
  unitSystem: UnitSystem,
  weight: number,
  heightValue1: number, // cm or feet
  heightValue2?: number // inches (optional)
): Promise<string> => {
  if (!API_KEY) {
    console.error("API_KEY for Gemini is not configured.");
    return "Personalized insights are unavailable at this moment. API key is missing.";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  let heightString = '';
  if (unitSystem === UnitSystem.Metric) {
    heightString = `${heightValue1} cm`;
  } else {
    heightString = `${heightValue1} ft ${heightValue2 || 0} in`;
  }
  const weightString = `${weight.toFixed(1)} ${unitSystem === UnitSystem.Metric ? 'kg' : 'lbs'}`;

  const prompt = `
    I am an adult. My BMI is ${bmi.toFixed(1)}.
    My current weight is ${weightString} and my height is ${heightString}.
    Provide 2-3 concise, actionable, and positive health insights or lifestyle tips based on this information.
    Keep the total response under 80 words.
    Do not give medical advice.
    Structure the response as a short paragraph.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
       config: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching health insights from Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        return "Could not fetch insights. The API key may be invalid or missing.";
    }
    return "Sorry, I couldn't fetch personalized insights at this moment. Please try again later.";
  }
};
    