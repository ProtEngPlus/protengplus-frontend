export function formatTime(query: { start_time: string; end_time: string }) {
  if (!query.start_time || !query.end_time) {
    return "-";
  }
  const startTime = new Date(query.start_time);
  const endTime = new Date(query.end_time);

  const diffInMilliseconds = endTime.getTime() - startTime.getTime();
  if (isNaN(diffInMilliseconds) || diffInMilliseconds < 0) {
    return "-";
  }

  // Convert the difference into seconds, minutes, and hours
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = diffInSeconds / 60;

  return diffInMinutes.toFixed(3);
}
