export function determineEscalation(severity: number): { level: 1|2|3|4|5, sosStatus: 'IDLE'|'ARMED'|'TRIGGERED' } {
  let level: 1|2|3|4|5 = 1;
  let sosStatus: 'IDLE'|'ARMED'|'TRIGGERED' = 'IDLE';

  if (severity >= 10) {
    level = 5;
    sosStatus = 'TRIGGERED';
  } else if (severity >= 8) {
    level = 4;
    sosStatus = 'ARMED';
  } else if (severity >= 6) {
    level = 3;
    sosStatus = 'IDLE';
  } else if (severity >= 4) {
    level = 2;
    sosStatus = 'IDLE';
  } else {
    level = 1;
    sosStatus = 'IDLE';
  }

  return { level, sosStatus };
}
