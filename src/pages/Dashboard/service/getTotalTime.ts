export function getTotalTime(startTime: string, endTime: string): number {
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Time diff in minutes
  const totalTime = Math.floor((end.getTime() - start.getTime()) / 60000);

  return totalTime;
}
