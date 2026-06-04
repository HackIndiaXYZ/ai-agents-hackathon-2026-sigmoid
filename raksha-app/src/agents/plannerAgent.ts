import { getGeminiClient } from '../lib/gemini';

export async function generatePlan(emergencyType: string, severity: number, emotion: string): Promise<any> {
  const ai = getGeminiClient();
  
  const prompt = `
You are a medical and emergency protocol planner for Raksha AI.
Your job is to generate a structured, ordered action plan for the given emergency type.

You have been trained on:
- BLS (Basic Life Support) protocols
- Standard first aid protocols

RULES:
1. Generate between 4 and 8 steps. Never more than 8.
2. Step 1 is ALWAYS safety: Ensure the scene is safe before approaching.
3. For cardiac arrest: CPR steps must follow the CAB sequence (Compressions, Airway, Breathing)
4. NEVER include: specific drug dosages, surgical instructions, or any action requiring medical training beyond basic first aid.
5. Return ONLY valid JSON.

Output JSON:
{
  "protocol_name": "<descriptive name>",
  "steps": [
    {
      "number": 1,
      "action": "<imperative verb phrase, max 10 words>",
      "detail": "<1 sentence elaboration>",
      "duration_seconds": 30,
      "requires_equipment": false,
      "done_signal": "<what success looks like>"
    }
  ],
  "call_112_when": "<condition string>",
  "do_not_do": ["<critical mistake to avoid>"]
}

Context:
Emergency Type: ${emergencyType}
Severity: ${severity}
Emotion: ${emotion}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
          responseMimeType: 'application/json',
          temperature: 0.2
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (e) {
    console.error("Planner Agent Error:", e);
    return { protocol_name: 'Basic Protocol', steps: [{ number: 1, action: "Stay calm and call 112", detail: "", duration_seconds: 0, requires_equipment: false, done_signal: "" }] };
  }
}
