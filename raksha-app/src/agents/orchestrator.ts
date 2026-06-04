import { detectEmotion } from './emotionAgent';
import { detectEmergency } from './emergencyAgent';
import { generatePlan } from './plannerAgent';
import { generateGuidance } from './guidanceAgent';
import { determineEscalation } from '../lib/escalationEngine';

function createTimelineEvent(agent: string, status: 'running' | 'completed' | 'failed', confidence: number, startTime: number, summary: string) {
  const durationMs = Date.now() - startTime;
  const now = new Date();
  const timestamp = now.toLocaleTimeString('en-US', { hour12: false });
  return {
    agent,
    status,
    confidence,
    durationMs,
    summary,
    timestamp
  };
}

export async function processEmergencyMessage(message: string) {
  const timeline: any[] = [];
  const startEmotion = Date.now();
  const startEmergency = Date.now();

  // Parallel execution for initial detection to save time
  const [emotionData, emergencyData] = await Promise.all([
    detectEmotion(message).catch(e => ({ state: 'UNKNOWN', error: true })),
    detectEmergency(message, 'UNKNOWN').catch(e => ({ type: 'UNKNOWN', severity: 5, confidence: 0.5, error: true }))
  ]);

  const emotion = emotionData.state || 'UNKNOWN';
  timeline.push(createTimelineEvent('Emotion Agent', emotionData.error ? 'failed' : 'completed', 0.94, startEmotion, `${emotion} detected`));

  const type = emergencyData.type || 'UNKNOWN';
  let severity = emergencyData.severity || 1;
  const emergencyConfidence = emergencyData.confidence || 0.85;
  timeline.push(createTimelineEvent('Emergency Agent', emergencyData.error ? 'failed' : 'completed', emergencyConfidence, startEmergency, `${type} (Sev ${severity})`));
  
  // Base severity from Emergency Agent, can be modified by emotion
  if (emotion === 'PANIC' && severity < 10) severity += 1;
  
  const startSOS = Date.now();
  const { level, sosStatus } = determineEscalation(severity);
  timeline.push(createTimelineEvent('SOS Agent', 'completed', 1.0, startSOS, `${sosStatus} at Lvl ${level}`));

  const startPlanner = Date.now();
  // Generate Plan
  const plan = await generatePlan(type, severity, emotion).catch(e => ({ protocol_name: 'Fallback Protocol', error: true }));
  timeline.push(createTimelineEvent('Planner Agent', plan.error ? 'failed' : 'completed', 0.88, startPlanner, plan.protocol_name || 'Plan Generated'));

  const startGuidance = Date.now();
  // Generate Guidance
  const guidance = await generateGuidance(plan, emotion, message).catch(e => {
    return "Error generating response. Please call 112.";
  });
  timeline.push(createTimelineEvent('Guidance Agent', guidance.includes('Error') ? 'failed' : 'completed', 0.92, startGuidance, 'Guidance formatted'));

  return {
    emotion,
    emergencyType: type,
    severity,
    escalationLevel: level,
    sosStatus,
    guidance,
    timeline
  };
}
