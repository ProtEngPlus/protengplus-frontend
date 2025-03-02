import { mkConfig, generateCsv, asBlob } from "export-to-csv";

export function ExportToCsv(data: { sequence: string; score: number }[]) {
  if (!Array.isArray(data) || data.length === 0) {
    console.error("Invalid or empty data provided for CSV export.");
    return;
  }

  // Configure CSV generator
  const csvConfig = mkConfig({
    useKeysAsHeaders: true,
  });

  console.log("CSV Config:", csvConfig);

  // Add index column to the data
  const dataWithIndex = data.map((item, index) => ({
    index: `sequence${index + 1}`,
    ...item,
  }));

  try {
    // Generate CSV content
    const csv = generateCsv(csvConfig)(dataWithIndex);

    // Convert CSV content to Blob
    const blob = asBlob(csvConfig)(csv);

    // Create a Blob URL for download
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "lab-result.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the Blob URL after download
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating CSV file:", error);
  }
}
