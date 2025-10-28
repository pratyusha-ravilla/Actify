



// client/src/components/TemplatePreview.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FDPAttendedContext } from "../context/FDPAttendedContext";

export default function TemplatePreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const [data, setData] = useState(state?.data || formData || null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [downloading, setDownloading] = useState(false);

  const API_BASE = "http://localhost:5001"; // Update if deploying

  // Load preview data
  useEffect(() => {
    if (state?.data) {
      localStorage.setItem("templatePreviewData", JSON.stringify(state.data));
      setData(state.data);
      setFormData(state.data);
    } else if (formData && Object.keys(formData).length > 0) {
      setData(formData);
    } else {
      const savedData = localStorage.getItem("templatePreviewData");
      if (savedData) setData(JSON.parse(savedData));
    }
  }, [state, formData, setFormData]);

  // Save to backend
  const handleSaveToDatabase = async () => {
    if (!data) {
      setMessage("⚠️ No FDP data found to save!");
      return;
    }

    try {
      setSaving(true);
      setMessage("⏳ Saving FDP Attended data...");

      const response = await fetch(`${API_BASE}/api/fdp-attended`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result?._id) {
        setFormData({ ...data, _id: result._id });
        localStorage.setItem("savedFDPId", result._id);

        setMessage("✅ FDP Attended data saved successfully!");
        console.log("Saved FDP entry:", result);
      } else {
        setMessage(`❌ Failed to save: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error saving FDP data:", err);
      setMessage("❌ Error while saving. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    if (!data?._id) {
      setMessage("⚠️ Save data first to download PDF!");
      return;
    }

    try {
      setDownloading(true);
      const response = await fetch(`${API_BASE}/api/fdp-attended/${data._id}/pdf`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.activityName || "fdp_attended"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setMessage("❌ Error downloading PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  // Download Word
  const handleDownloadWord = async () => {
    if (!data?._id) {
      setMessage("⚠️ Save data first to download Word document!");
      return;
    }

    try {
      setDownloading(true);
      const response = await fetch(`${API_BASE}/api/fdp-attended/${data._id}/word`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data.activityName || "fdp_attended"}.docx`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading Word:", err);
      setMessage("❌ Error downloading Word document. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  if (!data) return <p>No data available for preview.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Template Preview</h1>

      <p><strong>Activity Name:</strong> {data.activityName || "N/A"}</p>
      <p><strong>Co-ordinator:</strong> {data.coordinator || "N/A"}</p>
      <p><strong>Date:</strong> {data.date || "N/A"}</p>
      <p><strong>Duration:</strong> {data.duration || "N/A"}</p>
      <p><strong>PO & POs:</strong> {data.pos || "N/A"}</p>

      <h3>Table of Contents</h3>
      <p>{data.toc || "N/A"}</p>

      <h3>Resource Persons</h3>
      <ul>
        {data.resourcePersons?.length > 0 ? (
          data.resourcePersons.map((p, i) => (
            <li key={i}>
              {p.name || "N/A"} — {p.designation || "N/A"} ({p.institution || "N/A"})
            </li>
          ))
        ) : (
          <li>No resource persons listed.</li>
        )}
      </ul>

      <h3>Geo-Tagged Photos</h3>
      <ul>
        {data.geoTagPhotos?.length > 0 ? (
          data.geoTagPhotos.map((photo, i) => <li key={i}>{photo}</li>)
        ) : (
          <li>No geo-tagged photos provided.</li>
        )}
      </ul>

      <h3>Attendance</h3>
      <ul>
        {data.attendance?.length > 0 ? (
          data.attendance.map((att, i) => <li key={i}>{att}</li>)
        ) : (
          <li>No attendance records.</li>
        )}
      </ul>

      <h3>Feedback</h3>
      <p>
        {typeof data.feedback === "object"
          ? JSON.stringify(data.feedback, null, 2)
          : data.feedback || "N/A"}
      </p>

      <h3>Brochure</h3>
      <p>{data.brochure || "N/A"}</p>

      {/* Action Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleSaveToDatabase}
          disabled={saving}
          style={{
            padding: "10px 20px",
            backgroundColor: saving ? "#888" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: saving ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {saving ? "Saving..." : "💾 Save to Database"}
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          style={{
            padding: "10px 20px",
            backgroundColor: downloading ? "#888" : "#f44336",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: downloading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {downloading ? "Downloading..." : "📄 Download PDF"}
        </button>

        <button
          onClick={handleDownloadWord}
          disabled={downloading}
          style={{
            padding: "10px 20px",
            backgroundColor: downloading ? "#888" : "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: downloading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          {downloading ? "Downloading..." : "📝 Download Word"}
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>

      {message && (
        <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>
      )}
    </div>
  );
}
