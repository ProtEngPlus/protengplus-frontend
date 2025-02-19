export function UploadInputTemplate() {
  try {
    const csv = `ASIQHFHW,0.002914
    CSIQHFHW,0.00302
    DSIQHFHW,0.002219
    ESIQHFHW,0.004379`;

    const blob = new Blob([csv], { type: "text/csv" });

    // Create a Blob URL for download
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "lab-result-template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the Blob URL after download
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating CSV file:", error);
  }
}
