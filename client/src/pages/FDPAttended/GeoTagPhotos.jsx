

// //client/src/pages/FDPAttended/GeoTagPhotos.jsx



import { useContext, useState } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";
import leftLogo from "../../asserts/atria-logo.png";
import rightLogo from "../../asserts/atria-25years.png";

export default function GeoTagPhotos() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setFormData({ ...formData, geoTagPhotos: fileNames });

    // Preview display
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(imagePreviews);
  };

  return (
    <div
      style={{
        width: "21cm",
        minHeight: "29.7cm",
        backgroundColor: "#fff",
        margin: "0 auto",
        padding: "1cm",
        boxSizing: "border-box",
        pageBreakAfter: "always",
      }}
    >
      {/* ---------- HEADER ---------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ width: 100 }}>
          <img
            src={leftLogo}
            alt="ATRIA Logo"
            style={{ height: 70, objectFit: "contain" }}
          />
        </div>
        <div style={{ width: 100, textAlign: "right" }}>
          <img
            src={rightLogo}
            alt="25 Years Logo"
            style={{ height: 70, objectFit: "contain" }}
          />
        </div>
      </div>

      {/* ---------- TITLE ---------- */}
      <h2
        style={{
          textAlign: "center",
          color: "#4B0082",
          fontWeight: "bold",
          textDecoration: "underline",
          marginBottom: "1.5rem",
          fontSize: "22px",
        }}
      >
        PHOTOS
      </h2>

      {/* ---------- IMAGES SECTION ---------- */}
      {previews.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {previews.map((src, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                boxShadow: "0 0 8px rgba(0,0,0,0.15)",
                padding: "0.2cm",
                backgroundColor: "#fafafa",
                width: "fit-content",
              }}
            >
              <img
                src={src}
                alt={`GeoTagPhoto-${index + 1}`}
                style={{
                  width: "13.02cm",
                  height: "9.95cm",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
          No photos uploaded yet.
        </p>
      )}

      {/* ---------- FILE INPUT ---------- */}
      <div style={{ textAlign: "center", marginTop: "2cm" }}>
        <h3 style={{ color: "#4B0082" }}>Upload Geo-Tagged Photos</h3>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        {formData.geoTagPhotos?.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "1rem",
              color: "#4B0082",
              fontWeight: "bold",
            }}
          >
            {formData.geoTagPhotos.map((photo, i) => (
              <li key={i}>{photo}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
