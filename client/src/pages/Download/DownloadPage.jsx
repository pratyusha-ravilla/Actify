

// client/src/pages/Download/DownloadPage.jsx

// import React, { useContext, useState } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function DownloadPage() {
//   const { formData } = useContext(FDPAttendedContext);
//   const [status, setStatus] = useState("");
//   const API_BASE = "http://localhost:5001"; // ⚠️ update for deployment if needed

//   const handleDownload = async (format) => {
//     try {
//       setStatus("Generating report...");

//       // Ensure there's an ID from saved FDP entry
//       if (!formData?._id) {
//         alert("Please save the FDP Attended form first before downloading.");
//         setStatus("");
//         return;
//       }

//       // Call backend API to generate the report
//       const res = await fetch(`${API_BASE}/api/fdp-attended/${formData._id}/report`);
//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to generate report");
//       }

//       // Determine file URL based on selected format
//       const fileUrl =
//         format === "pdf" ? `${API_BASE}${data.pdf}` : `${API_BASE}${data.word}`;

//       // Trigger actual download
//       const link = document.createElement("a");
//       link.href = fileUrl;
//       link.download = `fdp_attended.${format === "pdf" ? "pdf" : "docx"}`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       setStatus(`✅ ${format.toUpperCase()} downloaded successfully`);
//     } catch (err) {
//       console.error("Error downloading report:", err);
//       setStatus("❌ Error generating report");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Download FDP Reports</h2>

//       <div style={{ marginTop: "10px" }}>
//         <button onClick={() => handleDownload("pdf")}>Download PDF</button>
//         <button onClick={() => handleDownload("word")}>Download Word</button>
//       </div>

//       {status && <p style={{ marginTop: "10px" }}>{status}</p>}
//     </div>
//   );
// }


// client/src/pages/Download/DownloadPage.jsx

import React, { useContext, useState, useEffect } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function DownloadPage() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const [status, setStatus] = useState("");
  const API_BASE = "http://localhost:5001"; // 🔧 change when deploying

  useEffect(() => {
    // Try to load the latest saved FDP ID from localStorage if not in context
    const savedId = localStorage.getItem("savedFDPId");
    if (savedId && !formData?._id) {
      setFormData((prev) => ({ ...prev, _id: savedId }));
    }
  }, [formData, setFormData]);

  const handleDownload = async (format) => {
    try {
      setStatus("⏳ Generating report...");

      // Ensure FDP is saved before downloading
      if (!formData?._id) {
        alert("Please save the FDP Attended form first before downloading.");
        setStatus("");
        return;
      }

      // Request backend to generate the report
      const res = await fetch(
        `${API_BASE}/api/fdp-attended/${formData._id}/report?format=${format}`
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to generate report");
      }

      // Convert response to blob (binary file)
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Trigger browser download
      const link = document.createElement("a");
      link.href = url;
      link.download = `fdp_attended.${format === "pdf" ? "pdf" : "docx"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setStatus(`✅ ${format.toUpperCase()} downloaded successfully`);
    } catch (err) {
      console.error("Error downloading report:", err);
      setStatus("❌ Error generating report. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Download FDP Report</h2>
      <p>
        {formData?._id
          ? `FDP Record ID: ${formData._id}`
          : "No saved FDP record found yet."}
      </p>

      <div style={{ marginTop: "15px" }}>
        <button onClick={() => handleDownload("pdf")}>⬇️ Download PDF</button>
        <button
          onClick={() => handleDownload("word")}
          style={{ marginLeft: "10px" }}
        >
          ⬇️ Download Word
        </button>
      </div>

      {status && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>{status}</p>
      )}
    </div>
  );
}
