

//client/src/pages/template/templatePreview.jsx


import React, { useState } from "react";
import TemplatePreview from "../../components/TemplatePreview";

const TemplatePage = () => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const dummyData = {
    title: "FDP on AI",
    summary: "This FDP covered basics of AI and ML.",
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const response = await fetch("http://localhost:5001/saveFDPServer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dummyData),
      });

      if (response.ok) {
        setMessage("✅ Template saved successfully!");
      } else {
        setMessage("❌ Failed to save template. Try again.");
      }
    } catch (error) {
      console.error("Error saving template:", error);
      setMessage("⚠️ An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Template Preview</h2>

      <TemplatePreview data={dummyData} />

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: saving ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: saving ? "not-allowed" : "pointer",
        }}
      >
        {saving ? "Saving..." : "Save Template"}
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default TemplatePage;




