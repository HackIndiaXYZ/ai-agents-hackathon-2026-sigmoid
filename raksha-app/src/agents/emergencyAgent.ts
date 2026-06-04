import { getGeminiClient } from '../lib/gemini';

export async function detectEmergency(message: string, emotion: string): Promise<any> {
  const ai = getGeminiClient();
  
  const prompt = `
You are an emergency classification specialist for Raksha AI, an emergency response 
system operating in India.

CLASSIFY the emergency into one of these types:
- CARDIAC_ARREST: Chest pain, not breathing, collapsed, "heart attack", "dil ka daura"
- CHOKING: Can't breathe, hands to throat, "kuch fas gaya", blocked airway
- BLEEDING_SEVERE: Heavy bleeding, cut, "bahut khoon", trauma
- BURNS: Fire exposure, chemical burn, skin damage
- DROWNING: Water, "doob raha hai", can't swim
- FRACTURE: Bone injury, can't move limb, fall impact
- POISONING: Ingested chemical/drug/wrong medication, "zeher"
- SEIZURE: Convulsions, shaking, "mirgi", uncontrolled movement
- ACCIDENT_ROAD: Vehicle crash, collision, road injury, "accident ho gaya"
- NATURAL_DISASTER: Flood, earthquake, fire building, "baarish", "bhookamp"
- MENTAL_CRISIS: Suicidal ideation, self-harm, "jeena nahi chahta" -> ALWAYS score 9+
- UNKNOWN: Unclear - ask one clarifying question

SEVERITY SCORING (1-10):
1-3: Non-urgent (minor cut, mild burn, confusion)
4-5: Attention needed (moderate pain, limited mobility)
6-7: Urgent (significant injury, escalating situation)
8-9: Life-threatening (cardiac, choking, severe bleeding)
10: Imminent death risk (no pulse + no breathing confirmed)

RULES:
- Err on the side of higher severity; under-scoring is dangerous
- Return ONLY valid JSON exactly matching the schema below.

Output JSON:
{
  "type": "<emergency type>",
  "severity": <number 1-10>,
  "confidence": <number 0.0-1.0>,
  "time_critical": <boolean>,
  "parallel_actions": ["<action>", ...],
  "clarifying_question": "<only if type = UNKNOWN>"
}

Context:
User Emotion: ${emotion}
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
    console.error("Emergency Agent Error:", e);
    return { type: 'UNKNOWN', severity: 5, confidence: 0.5, time_critical: false, parallel_actions: [] };
  }
}
