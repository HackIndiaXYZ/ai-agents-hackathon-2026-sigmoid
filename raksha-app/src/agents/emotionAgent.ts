import { getGeminiClient } from '../lib/gemini';

export async function detectEmotion(message: string): Promise<any> {
  const ai = getGeminiClient();
  
  const prompt = `
You are an emotion detection specialist for an emergency response system.
Your only job is to assess the emotional state of a person based on their message.

You detect exactly three states:
- PANIC: Fragmented sentences, repeated words, ALL CAPS, exclamation marks, 
  expressions of helplessness ("I don't know what to do", "please help", "kya karu"),
  incomplete thoughts, time pressure language ("hurry", "fast", "jaldi")
- CONFUSED: Questions without context, contradictory statements, 
  uncertainty language ("maybe", "I think", "shayad"), 
  requests to repeat or clarify
- CALM: Complete sentences, present tense description, structured thinking,
  asks specific questions

CRITICAL RULES:
- When in doubt, classify as PANIC (false positive is safer)
- Hinglish / Hindi text is valid — assess emotion, not grammar
- Do NOT explain your reasoning in the output
- Return ONLY valid JSON exactly matching the schema below.

Output JSON exactly:
{
  "state": "PANIC" | "CONFUSED" | "CALM",
  "confidence": 0.0-1.0,
  "signals": ["<evidence string 1>", "<evidence string 2>"],
  "recommended_tone": "ultra_simple" | "reassuring" | "clinical"
}

User Message: "${message}"
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
          responseMimeType: 'application/json',
          temperature: 0.1
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (e) {
    console.error("Emotion Agent Error:", e);
    return { state: 'PANIC', confidence: 0.5, signals: [], recommended_tone: 'ultra_simple' };
  }
}
