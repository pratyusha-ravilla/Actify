

 // // client/src/components/TemplatePreview.jsx
 
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FDPAttendedContext } from "../context/FDPAttendedContext";
import leftLogo from "../asserts/atria-logo.png"; // rename your first logo
import rightLogo from "../asserts/atria-25years.png"; // rename your second logo

export default function TemplatePreview() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const [data, setData] = useState(state?.data || formData || null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [templateBase, setTemplateBase] = useState(null);
  const [loadingTemplate, setLoadingTemplate] = useState(false);

  const API_BASE = "http://localhost:5001";

  // ---------------- Load Preview Data ----------------
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

  // ---------------- Save FDP to DB ----------------
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

  // ---------------- Download Auto-Filled PDF/Word ----------------
  // ---------------- Download Auto-Filled PDF/Word ----------------
const handleDownload = async (format) => {
  if (!data?._id) {
    setMessage("⚠️ Save data first before downloading the report!");
    return;
  }

  try {
    setDownloading(true);
    setMessage(`⏳ Preparing ${format.toUpperCase()} report...`);

    // ✅ Ensure correct backend route
    const endpoint =
      format === "pdf"
        ? `${API_BASE}/api/template/fdp-attended/${data._id}/pdf`
        : `${API_BASE}/api/template/fdp-attended/${data._id}/word`;

    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Failed to download file");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    // ✅ Force correct file extension mapping
    const extensionMap = {
      pdf: "pdf",
      word: "docx", // ✅ Fix for .word issue
    };

    // ✅ Clean the filename (avoid spaces/slashes)
    const safeFileName = (data.activityName || "fdp_attended")
      .replace(/[\\/:*?"<>|]+/g, "")
      .replace(/\s+/g, "_");

    link.download = `${safeFileName}.${extensionMap[format]}`;
    link.click();
    window.URL.revokeObjectURL(url);

    setMessage(`✅ ${format.toUpperCase()} downloaded successfully!`);
  } catch (err) {
    console.error(`Error downloading ${format}:`, err);
    setMessage(`❌ Error downloading ${format}. Please try again.`);
  } finally {
    setDownloading(false);
  }
};


  // ---------------- View Blank FDP Template ----------------
  const handleViewBaseTemplate = async () => {
    try {
      setLoadingTemplate(true);
      setMessage("⏳ Loading FDP base template...");

      const response = await fetch(`${API_BASE}/api/template/fdp-attended/template`);
      const result = await response.json();

      if (response.ok) {
        setTemplateBase(result.template);
        setMessage("✅ FDP Template loaded successfully!");
      } else {
        setMessage("❌ Failed to load template base.");
      }
    } catch (err) {
      console.error("Error loading FDP template:", err);
      setMessage("❌ Error loading template.");
    } finally {
      setLoadingTemplate(false);
    }
  };

  // ---------------- UI Render ----------------
  if (!data) return <p>No FDP Attended data available for preview.</p>;

  return (
    <div style={{ padding: "30px", backgroundColor: "#fafafa", fontFamily: "Segoe UI, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "3px solid #a52a2a",
          paddingBottom: "10px",
          marginBottom: "25px",
        }}
      >
        <img src={leftLogo} alt="Atria Logo" style={{ width: "140px", height: "auto" }} />
        <div style={{ textAlign: "center" }}>
          <h2 style={{ margin: "0", color: "#a52a2a", fontWeight: "700" }}>
            ATRIA INSTITUTE OF TECHNOLOGY
          </h2>
          <p style={{ margin: "5px 0", fontWeight: "500", color: "#444" }}>
            (An Autonomous Institution, Affiliated to VTU, Approved by AICTE)
          </p>
          <h4 style={{ margin: 0, color: "#4B0082" }}>Department of Computer Science and Engineering</h4>
        </div>
        <img src={rightLogo} alt="25 Years Logo" style={{ width: "90px", height: "auto" }} />
      </div>

      {/* FDP Report Title */}
      <h3
        style={{
          textAlign: "center",
          background: "#a52a2a",
          color: "white",
          padding: "8px 0",
          borderRadius: "6px",
          letterSpacing: "1px",
        }}
      >
        FACULTY DEVELOPMENT PROGRAM (FDP) ATTENDED REPORT
      </h3>

      {/* Main Data Section */}
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          padding: "25px",
          marginTop: "20px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", lineHeight: "1.7" }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: "600", color: "#4B0082", width: "35%" }}>Title of FDP:</td>
              <td>{data.activityName || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "600", color: "#4B0082" }}>Coordinator:</td>
              <td>{data.coordinator || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "600", color: "#4B0082" }}>Date:</td>
              <td>{data.date || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "600", color: "#4B0082" }}>Duration:</td>
              <td>{data.duration || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "600", color: "#4B0082" }}>PO & PSOs Mapped:</td>
              <td>{data.pos || "N/A"}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "600", color: "#4B0082" }}>Feedback Summary:</td>
              <td>{data.feedback || "N/A"}</td>
            </tr>
          </tbody>
        </table>

        <h4 style={{ marginTop: "25px", color: "#a52a2a" }}>Resource Persons:</h4>
        {data.resourcePersons?.length > 0 ? (
          <ul>
            {data.resourcePersons.map((p, i) => (
              <li key={i}>
                {p.name || "N/A"} — {p.designation || "N/A"} ({p.institution || "N/A"})
              </li>
            ))}
          </ul>
        ) : (
          <p>No resource persons listed.</p>
        )}

        <h4 style={{ marginTop: "20px", color: "#a52a2a" }}>Geo-tagged Photos:</h4>
        <ul>
          {data.geoTagPhotos?.length > 0
            ? data.geoTagPhotos.map((photo, i) => <li key={i}>{photo}</li>)
            : <li>No photos provided.</li>}
        </ul>

        <h4 style={{ marginTop: "20px", color: "#a52a2a" }}>Attendance:</h4>
        <ul>
          {data.attendance?.length > 0
            ? data.attendance.map((att, i) => <li key={i}>{att}</li>)
            : <li>No attendance details provided.</li>}
        </ul>

        <h4 style={{ marginTop: "20px", color: "#a52a2a" }}>Brochure / Annexures:</h4>
        <p>{data.brochure || "N/A"}</p>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={handleSaveToDatabase}
          disabled={saving}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 25px",
            border: "none",
            borderRadius: "6px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          {saving ? "Saving..." : "💾 Save FDP"}
        </button>

        <button
          onClick={() => handleDownload("pdf")}
          disabled={downloading}
          style={{
            backgroundColor: "#a52a2a",
            color: "white",
            padding: "10px 25px",
            border: "none",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        >
          {downloading ? "Preparing..." : "📄 Download PDF"}
        </button>

        <button
          onClick={() => handleDownload("word")}
          disabled={downloading}
          style={{
            backgroundColor: "#4B0082",
            color: "white",
            padding: "10px 25px",
            border: "none",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        >
          {downloading ? "Preparing..." : "📝 Download Word"}
        </button>

        <button
          onClick={handleViewBaseTemplate}
          disabled={loadingTemplate}
          style={{
            backgroundColor: "#2196F3",
            color: "white",
            padding: "10px 25px",
            border: "none",
            borderRadius: "6px",
            marginRight: "10px",
          }}
        >
          {loadingTemplate ? "Loading..." : "📋 View FDP Template"}
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#9E9E9E",
            color: "white",
            padding: "10px 25px",
            border: "none",
            borderRadius: "6px",
          }}
        >
          🔙 Back
        </button>
      </div>

      {message && (
        <p style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center" }}>{message}</p>
      )}
    </div>
  );
}
