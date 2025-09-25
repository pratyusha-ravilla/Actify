import React from "react";
import { useLocation } from "react-router-dom";

export default function DownloadPage() {
  const { state } = useLocation();
  const data = state?.data;

  if (!data) return <p>No data available for download</p>;

  const handleDownload = (format) => {
    // For now, simulate a download
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob(
      [content],
      { type: format === "pdf" ? "application/pdf" : "application/msword" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `report.${format === "pdf" ? "pdf" : "doc"}`;
    link.click();
  };

  return (
    <div>
      <h2>Download Document</h2>
      <button onClick={() => handleDownload("pdf")}>Download as PDF</button>
      <button onClick={() => handleDownload("word")}>Download as Word</button>
    </div>
  );
}
