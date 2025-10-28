
//client/src/pages/FDPAttended/TOC.jsx


// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function TOC() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);

//   return (
//     <div>
//       <h2>Table of Contents</h2>
//       <textarea
//         value={formData.toc}
//         onChange={(e) => setFormData({ ...formData, toc: e.target.value })}
//         rows="5"
//         cols="50"
//       />
//     </div>
//   );
// }



// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function TOC() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);

//   return (
//     <div>
//       <h2>Table of Contents</h2>
//       <textarea
//         placeholder="Enter table of contents"
//         value={formData.toc || ""}
//         onChange={(e) => setFormData({ ...formData, toc: e.target.value })}
//       />
//     </div>
//   );
// }


import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";
import leftLogo from "../../asserts/atria-logo.png";       // left header logo
import rightLogo from "../../asserts/atria-25years.png";  // right header logo

export default function TOC() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const handleChange = (index, field, value) => {
    const updatedTOC = [...(formData.tocList || [])];
    updatedTOC[index][field] = value;
    setFormData({ ...formData, tocList: updatedTOC });
  };

  const addRow = () => {
    const updatedTOC = [...(formData.tocList || []), { slNo: "", content: "" }];
    setFormData({ ...formData, tocList: updatedTOC });
  };

  const removeRow = (index) => {
    const updatedTOC = [...(formData.tocList || [])];
    updatedTOC.splice(index, 1);
    setFormData({ ...formData, tocList: updatedTOC });
  };

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        backgroundColor: "#fff",
        padding: "48px 60px",
        width: "794px",      // A4 width
        minHeight: "1123px", // A4 height
        margin: "24px auto",
        border: "1px solid #eee",
        borderRadius: 6,
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        boxSizing: "border-box",
      }}
    >
      {/* ---------- HEADER ---------- */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <div style={{ width: 150, display: "flex", justifyContent: "flex-start" }}>
          <img
            src={leftLogo}
            alt="ATRIA"
            style={{ height: 70, objectFit: "contain" }}
          />
        </div>

        <div style={{ width: 150, display: "flex", justifyContent: "flex-end" }}>
          <img
            src={rightLogo}
            alt="25 Years"
            style={{ height: 70, objectFit: "contain" }}
          />
        </div>
      </header>

      {/* ---------- TITLE ---------- */}
      <h2
        style={{
          textAlign: "center",
          color: "#4b0082",
          textDecoration: "underline",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 28,
        }}
      >
        TABLE OF CONTENTS
      </h2>

      {/* ---------- TABLE ---------- */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "2px solid #4b0082",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#4b0082", color: "#fff" }}>
            <th
              style={{
                width: "15%",
                padding: "10px",
                fontSize: 16,
                border: "1px solid #4b0082",
                textAlign: "center",
              }}
            >
              Sl. No
            </th>
            <th
              style={{
                padding: "10px",
                fontSize: 16,
                border: "1px solid #4b0082",
                textAlign: "center",
              }}
            >
              CONTENT
            </th>
          </tr>
        </thead>

        <tbody>
          {(formData.tocList || []).map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#ead3d3" : "#f7ecec",
                fontWeight: 600,
              }}
            >
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid #4b0082",
                  padding: "8px",
                  color: "#4b0082",
                }}
              >
                <input
                  type="text"
                  placeholder="1."
                  value={row.slNo}
                  onChange={(e) => handleChange(index, "slNo", e.target.value)}
                  style={{
                    textAlign: "center",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 15,
                    color: "#4b0082",
                    width: "100%",
                  }}
                />
              </td>
              <td
                style={{
                  border: "1px solid #4b0082",
                  padding: "8px 12px",
                  color: "#4b0082",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter Content"
                  value={row.content}
                  onChange={(e) => handleChange(index, "content", e.target.value)}
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#4b0082",
                    width: "100%",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- BUTTONS ---------- */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button
          onClick={addRow}
          style={{
            backgroundColor: "#4b0082",
            color: "white",
            border: "none",
            padding: "8px 18px",
            marginRight: "10px",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          + Add Row
        </button>
        {(formData.tocList || []).length > 0 && (
          <button
            onClick={() => removeRow((formData.tocList || []).length - 1)}
            style={{
              backgroundColor: "#a52a2a",
              color: "white",
              border: "none",
              padding: "8px 18px",
              borderRadius: 4,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            − Remove Row
          </button>
        )}
      </div>
    </div>
  );
}
