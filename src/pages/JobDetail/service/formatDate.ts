export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return `${formattedDate} | ${formattedTime}`;
}
