
// client/src/pages/FDPAttended/UploadBrochure.jsx

import { useContext, useState } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";
import leftLogo from "../../asserts/atria-logo.png";       // left header logo
import rightLogo from "../../asserts/atria-25years.png";  // right header logo

export default function UploadBrochure() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });

      // Store file names in context (for DB compatibility)
      const fileNames = files.map((f) => f.name);
      setFormData({ ...formData, brochure: fileNames });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      {/* Upload Input */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h3>Upload Brochure(s)</h3>
        <input
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={handleFileChange}
        />
        {formData.brochure && formData.brochure.length > 0 && (
          <p style={{ marginTop: "10px" }}>
            Selected: {formData.brochure.join(", ")}
          </p>
        )}
      </div>

      {/* Render Each Poster as A4 Page */}
      {previews.length > 0 ? (
        previews.map((preview, index) => (
          <div
            key={index}
            style={{
              width: "21cm",
              height: "29.7cm",
              margin: "0 auto",
              marginBottom: "30px",
              padding: "1cm",
              boxSizing: "border-box",
              backgroundColor: "#fff",
              boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              pageBreakAfter: "always",
              position: "relative",
            }}
          >
            {/* Header with logos */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  width: 100,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={leftLogo}
                  alt="ATRIA"
                  style={{ height: 70, objectFit: "contain" }}
                />
              </div>
              <div
                style={{
                  width: 100,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  src={rightLogo}
                  alt="25 Years"
                  style={{ height: 70, objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Poster Heading */}
            <h2
              style={{
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: "2px",
                color: "#4B0082",
                marginBottom: "20px",
                textDecoration: "underline",
              }}
            >
              POSTER
            </h2>

            {/* Poster Image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "23cm",
              }}
            >
              <img
                src={preview}
                alt={`Poster ${index + 1}`}
                style={{
                  width: "15.24cm",
                  height: "20.63cm",
                  objectFit: "contain",
                  border: "1px solid #ddd",
                  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          No brochures uploaded yet.
        </p>
      )}
    </div>
  );
}
