import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});
export async function POST(req: NextRequest) {
  const { weight, height, goal, foodStyle } = await req.json();

  const prompt = `Generate a diet plan for ${goal} (${foodStyle} style) for a person with weight ${weight} kg and height ${height} cm.`;

  const secondPrompt = ` Format the output strictly in JSON with the following structure:
  
  {
  "diet": {
    "breakfast": {
      "food": {
        "name": "string",
        "calories": "number",
        "protein": "number",
        "carbs": "number",
        "fat": "number"
      }
    },
    "midbreakfast": {
      "food": {
        "name": "string",
        "calories": "number",
        "protein": "number",
        "carbs": "number",
        "fat": "number"
      }
    },
    "lunch": {
      "food": {
        "name": "string",
        "calories": "number",
        "protein": "number",
        "carbs": "number",
        "fat": "number"
      }
    },
     "snacks": {
      "food": {
        "name": "string",
        "calories": "number",
        "protein": "number",
        "carbs": "number",
        "fat": "number"
      }
    },
    "dinner": {
      "food": {
        "name": "string",
        "calories": "number",
        "protein": "number",
        "carbs": "number",
        "fat": "number"
      }
    }
  }
}

  
  
  `;

  const response = await model.invoke(prompt + secondPrompt);

  const replacedResponse = response.content
    .toString()
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "");
  const data = JSON.parse(replacedResponse);

  return NextResponse.json({ data });
}
