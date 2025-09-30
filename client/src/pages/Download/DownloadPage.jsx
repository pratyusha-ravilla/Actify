



// import React from "react";
// import { useLocation } from "react-router-dom";

// export default function DownloadPage() {
//   const { state } = useLocation();
//   const data = state?.data;

//   if (!data) return <p>No data available for download</p>;

//   const handleDownload = (format) => {
//     const fileLink = format === "pdf" ? data.pdf : data.word;
//     if (!fileLink) {
//       alert("Report not generated yet. Please generate report first.");
//       return;
//     }
//     const link = document.createElement("a");
//     link.href = fileLink;
//     link.download = fileLink.split("/").pop();
//     link.click();
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2>Download Document</h2>
//       <button onClick={() => handleDownload("pdf")}>Download as PDF</button>
//       <button onClick={() => handleDownload("word")}>Download as Word</button>
//     </div>
//   );
// }



import React, { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function DownloadPage() {
  const { formData } = useContext(FDPAttendedContext);

  const handleDownload = (format) => {
    const content = JSON.stringify(formData, null, 2);
    const blob = new Blob(
      [content],
      { type: format === "pdf" ? "application/pdf" : "application/msword" }
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `fdp_attended.${format === "pdf" ? "pdf" : "doc"}`;
    link.click();
  };

  return (
    <div>
      <h2>Download Options</h2>
      <button onClick={() => handleDownload("pdf")}>Download PDF</button>
      <button onClick={() => handleDownload("word")}>Download Word</button>
    </div>
  );
}
