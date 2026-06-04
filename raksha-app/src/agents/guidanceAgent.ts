import { getGeminiClient } from '../lib/gemini';

export async function generateGuidance(plan: any, emotion: string, message: string): Promise<string> {
  const ai = getGeminiClient();
  
  const prompt = `
You are the voice of Raksha AI — the agent that speaks directly to the user in a crisis.
Your output is what the user SEES on their phone screen.

RULES:
- CALM but URGENT when situation demands.
- CLEAR: Never ambiguous. One step at a time.
- ADAPTIVE: Match language exactly to what the user wrote (EN/HI/Hinglish).
- PANIC-SAFE: When user is in PANIC state (${emotion === 'PANIC'}), use this writing mode:
    * Maximum 6 words per bullet
    * Use numbers (1, 2, 3) not prose
    * Bold the action verb
    * No subordinate clauses
    * One instruction = one line
- REASSURING: Begin with a single calming phrase before instructions.

STRUCTURE:
1. [One line] Calming acknowledgement (3-5 words max)
2. [Heading] What's happening (situation name, localized)
3. [Steps] Numbered steps from the plan, formatted for user's emotional state
4. [SOS CTA] Always end with the relevant emergency number (Call 112)
5. [Reassurance] One line: "Aap kar sakte ho" / "You're doing the right thing"

PLAN TO FORMAT:
${JSON.stringify(plan, null, 2)}

Original User Message: "${message}"

Output ONLY the formatted response text (no JSON).
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
          temperature: 0.3
      }
    });

    return response.text || "Stay calm. Call 112 immediately.";
  } catch (e) {
    console.error("Guidance Agent Error:", e);
    return "Error generating response. Please call 112.";
  }
}
