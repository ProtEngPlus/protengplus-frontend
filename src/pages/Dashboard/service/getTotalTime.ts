export function getTotalTime(startTime: string, endTime: string): number {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const totalTime = parseFloat(
    ((end.getTime() - start.getTime()) / 60000).toFixed(3)
  );

  return totalTime;
}
