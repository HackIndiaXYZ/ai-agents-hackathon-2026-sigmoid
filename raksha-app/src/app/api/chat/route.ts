import { NextResponse } from 'next/server';
import { processEmergencyMessage } from '@/agents/orchestrator';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const result = await processEmergencyMessage(message);

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Chat Error:', error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      guidance: "System error occurred. Please dial 112 immediately.",
      emotion: "UNKNOWN",
      emergencyType: "UNKNOWN",
      severity: 10,
      escalationLevel: 5,
      sosStatus: "TRIGGERED"
    }, { status: 500 });
  }
}
