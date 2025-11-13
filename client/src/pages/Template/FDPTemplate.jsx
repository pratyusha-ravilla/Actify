// client/src/pages/Template/FDPTemplate.jsx
import React, { useEffect, useState } from "react";

export default function FDPTemplate() {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const API_BASE = "http://localhost:5001/api/template";

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`${API_BASE}/fdp-attended/template`);
        const result = await response.json();
        if (response.ok) {
          setTemplate(result.template);
        } else {
          setMessage("❌ Failed to load template structure.");
        }
      } catch (err) {
        setMessage("❌ Error fetching template.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, []);

  const handleDownload = async (format) => {
    const url = `${API_BASE}/fdp-attended/template/${format}`;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `FDP_Template.${format === "pdf" ? "pdf" : "docx"}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setMessage(`✅ ${format.toUpperCase()} Template Downloaded Successfully!`);
    } catch (err) {
      console.error("Error downloading template:", err);
      setMessage("❌ Failed to download template.");
    }
  };

  if (loading) return <p>Loading FDP Attended Template...</p>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#4b0082",
          textDecoration: "underline",
        }}
      >
        FDP ATTENDED TEMPLATE
      </h2>

      {/* Header */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <h3 style={{ color: "#a52a2a", margin: "5px 0" }}>
          {template?.header?.collegeName}
        </h3>
        <h4 style={{ color: "#a52a2a", margin: "5px 0" }}>
          {template?.header?.department}
        </h4>
        <p style={{ color: "#4b0082", fontWeight: "bold" }}>
          {template?.header?.reportTitle}
        </p>
        <p style={{ color: "#333" }}>
          Academic Year: <b>{template?.header?.academicYear}</b>
        </p>
      </div>

      {/* Sections */}
      {template?.sections?.map((section, index) => (
        <div
          key={index}
          style={{
            marginBottom: "25px",
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h4
            style={{
              color: "#4b0082",
              marginBottom: "10px",
              textDecoration: "underline",
            }}
          >
            {section.title}
          </h4>
          <ul style={{ paddingLeft: "20px" }}>
            {section.fields.map((field, i) => (
              <li key={i} style={{ marginBottom: "6px", color: "#333" }}>
                {field}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Download Buttons */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => handleDownload("pdf")}
          style={{
            backgroundColor: "#4b0082",
            color: "white",
            padding: "10px 20px",
            margin: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📄 Download PDF
        </button>
        <button
          onClick={() => handleDownload("word")}
          style={{
            backgroundColor: "#a52a2a",
            color: "white",
            padding: "10px 20px",
            margin: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📝 Download Word
        </button>
      </div>

      {message && (
        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
