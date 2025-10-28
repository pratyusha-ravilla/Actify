
//client/src/pages/FDPAttended/ResourcePerson.jsx

import React, { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";
import leftLogo from "../../asserts/atria-logo.png";
import rightLogo from "../../asserts/atria-25years.png";

export default function ResourcePerson() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const addResourcePerson = () => {
    setFormData({
      ...formData,
      resourcePersons: [
        ...(formData.resourcePersons || []),
        {
          name: "",
          designation: "",
          institution: "",
          email: "",
          phone: "",
          image: "",
          otherInformation: "",
        },
      ],
    });
  };

  const removeResourcePerson = (index) => {
    const updated = [...formData.resourcePersons];
    updated.splice(index, 1);
    setFormData({ ...formData, resourcePersons: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.resourcePersons];
    updated[index][field] = value;
    setFormData({ ...formData, resourcePersons: updated });
  };

  const handleImageChange = (index, file) => {
    const updated = [...formData.resourcePersons];
    const imageUrl = URL.createObjectURL(file);
    updated[index].image = imageUrl;
    setFormData({ ...formData, resourcePersons: updated });
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
        borderRadius: "10px",
        boxShadow: "0 0 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* ---------- HEADER WITH LOGOS ---------- */}
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

      {/* ---------- PAGE TITLE ---------- */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          color: "#4B0082",
          textDecoration: "underline",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        RESOURCE PERSON DETAILS
      </h2>

      {/* ---------- RESOURCE PERSON FORMS ---------- */}
      {formData.resourcePersons?.map((person, idx) => (
        <div
          key={idx}
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "25px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <input
              type="text"
              placeholder="Name"
              value={person.name}
              onChange={(e) => handleChange(idx, "name", e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Designation"
              value={person.designation}
              onChange={(e) => handleChange(idx, "designation", e.target.value)}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Institution"
              value={person.institution}
              onChange={(e) => handleChange(idx, "institution", e.target.value)}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={person.email}
              onChange={(e) => handleChange(idx, "email", e.target.value)}
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={person.phone}
              onChange={(e) => handleChange(idx, "phone", e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* ---------- IMAGE UPLOAD ---------- */}
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", color: "#555" }}>
              Upload Resource Person Image (8.49 x 9.21 cm)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(idx, e.target.files[0])}
              style={{
                display: "block",
                marginTop: "8px",
                marginBottom: "10px",
              }}
            />
            {person.image && (
              <img
                src={person.image}
                alt="Preview"
                style={{
                  width: "8.49cm",
                  height: "9.21cm",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            )}
          </div>

          {/* ---------- OTHER INFORMATION (Like TOC Style) ---------- */}
          <div style={{ marginTop: "10px" }}>
            <label style={{ fontWeight: "bold", color: "#555" }}>
              Other Information
            </label>
            <textarea
              placeholder="Enter additional details..."
              value={person.otherInformation}
              onChange={(e) =>
                handleChange(idx, "otherInformation", e.target.value)
              }
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                resize: "vertical",
                marginTop: "8px",
              }}
            />
          </div>

          {/* ---------- REMOVE BUTTON ---------- */}
          <div style={{ textAlign: "right", marginTop: "15px" }}>
            <button
              onClick={() => removeResourcePerson(idx)}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* ---------- ADD BUTTON ---------- */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={addResourcePerson}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          + Add Resource Person
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  width: "100%",
};
