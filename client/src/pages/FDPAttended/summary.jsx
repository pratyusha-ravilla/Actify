
// client/src/pages/FDPAttended/Summary.jsx


// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function Summary() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);
//   const safeFormData = formData || {};

//   const handleChange = (field, value) => {
//     setFormData({ ...safeFormData, [field]: value });
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
//       <h2>Summary</h2>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Activity Name:</strong></label><br />
//         <input
//           type="text"
//           placeholder="Enter Activity Name"
//           value={safeFormData.activityName || ""}
//           onChange={(e) => handleChange("activityName", e.target.value)}
//           style={{ width: "100%", padding: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Co-ordinator:</strong></label><br />
//         <input
//           type="text"
//           placeholder="Enter Co-ordinator Name(s)"
//           value={safeFormData.coordinator || ""}
//           onChange={(e) => handleChange("coordinator", e.target.value)}
//           style={{ width: "100%", padding: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Date:</strong></label><br />
//         <input
//           type="date"
//           value={safeFormData.date || ""}
//           onChange={(e) => handleChange("date", e.target.value)}
//           style={{ width: "100%", padding: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>Duration:</strong></label><br />
//         <input
//           type="text"
//           placeholder="Enter Duration (e.g., 11:00 to 12:30 PM)"
//           value={safeFormData.duration || ""}
//           onChange={(e) => handleChange("duration", e.target.value)}
//           style={{ width: "100%", padding: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "10px" }}>
//         <label><strong>PO & POs:</strong></label><br />
//         <input
//           type="text"
//           placeholder="Enter PO & POs (e.g., PO5)"
//           value={safeFormData.pos || ""}
//           onChange={(e) => handleChange("pos", e.target.value)}
//           style={{ width: "100%", padding: "5px" }}
//         />
//       </div>
//     </div>
//   );
// }



// // client/src/pages/FDPAttended/Summary.jsx
// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";
// import atriaLogo from "../../asserts/atria-logo.png"; // <-- Add your logo file in assets folder

// export default function Summary() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);
//   const safeFormData = formData || {};

//   const handleChange = (field, value) => {
//     setFormData({ ...safeFormData, [field]: value });
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "Times New Roman, serif",
//         backgroundColor: "#fff",
//         padding: "40px",
//         maxWidth: "800px",
//         margin: "0 auto",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//       }}
//     >
//       {/* ---------- HEADER ---------- */}
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <img src={atriaLogo} alt="Atria Logo" style={{ height: "80px" }} />
//         <h2 style={{ color: "#a52a2a", marginTop: "10px", marginBottom: "5px" }}>
//           Department of Computer Science & Engineering
//         </h2>
//         <h3 style={{ color: "#a52a2a", marginTop: "5px" }}>
//           Program: <span style={{ color: "#4b0082" }}>Computer Science & Design</span>
//         </h3>
//       </div>

//       {/* ---------- TITLE ---------- */}
//       <h2
//         style={{
//           textAlign: "center",
//           color: "#4b0082",
//           textDecoration: "underline",
//           marginBottom: "25px",
//         }}
//       >
//         ACTIVITY CONDUCTED REPORT
//       </h2>

//       {/* ---------- FORM TABLE ---------- */}
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           marginBottom: "40px",
//         }}
//       >
//         <tbody>
//           <tr style={{ backgroundColor: "#ead3d3" }}>
//             <td style={{ fontWeight: "bold", padding: "8px", width: "30%" }}>
//               Activity Name:
//             </td>
//             <td style={{ padding: "8px" }}>
//               <input
//                 type="text"
//                 placeholder="Enter Activity Name"
//                 value={safeFormData.activityName || ""}
//                 onChange={(e) => handleChange("activityName", e.target.value)}
//                 style={{
//                   width: "100%",
//                   border: "none",
//                   outline: "none",
//                   fontSize: "16px",
//                   backgroundColor: "transparent",
//                 }}
//               />
//             </td>
//           </tr>

//           <tr style={{ backgroundColor: "#ead3d3" }}>
//             <td style={{ fontWeight: "bold", padding: "8px" }}>Co-ordinator:</td>
//             <td style={{ padding: "8px" }}>
//               <input
//                 type="text"
//                 placeholder="Enter Co-ordinator Name(s)"
//                 value={safeFormData.coordinator || ""}
//                 onChange={(e) => handleChange("coordinator", e.target.value)}
//                 style={{
//                   width: "100%",
//                   border: "none",
//                   outline: "none",
//                   fontSize: "16px",
//                   backgroundColor: "transparent",
//                 }}
//               />
//             </td>
//           </tr>

//           <tr style={{ backgroundColor: "#ead3d3" }}>
//             <td style={{ fontWeight: "bold", padding: "8px" }}>Date:</td>
//             <td style={{ padding: "8px" }}>
//               <input
//                 type="date"
//                 value={safeFormData.date || ""}
//                 onChange={(e) => handleChange("date", e.target.value)}
//                 style={{
//                   width: "100%",
//                   border: "none",
//                   outline: "none",
//                   fontSize: "16px",
//                   backgroundColor: "transparent",
//                 }}
//               />
//             </td>
//           </tr>

//           <tr style={{ backgroundColor: "#ead3d3" }}>
//             <td style={{ fontWeight: "bold", padding: "8px" }}>Duration:</td>
//             <td style={{ padding: "8px" }}>
//               <input
//                 type="text"
//                 placeholder="Enter Duration (e.g., 10:00 AM to 11:30 AM)"
//                 value={safeFormData.duration || ""}
//                 onChange={(e) => handleChange("duration", e.target.value)}
//                 style={{
//                   width: "100%",
//                   border: "none",
//                   outline: "none",
//                   fontSize: "16px",
//                   backgroundColor: "transparent",
//                 }}
//               />
//             </td>
//           </tr>

//           <tr style={{ backgroundColor: "#ead3d3" }}>
//             <td style={{ fontWeight: "bold", padding: "8px" }}>PO & POs:</td>
//             <td style={{ padding: "8px" }}>
//               <input
//                 type="text"
//                 placeholder="Enter PO & POs (e.g., PO4, PO10)"
//                 value={safeFormData.pos || ""}
//                 onChange={(e) => handleChange("pos", e.target.value)}
//                 style={{
//                   width: "100%",
//                   border: "none",
//                   outline: "none",
//                   fontSize: "16px",
//                   backgroundColor: "transparent",
//                 }}
//               />
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* ---------- FOOTER ---------- */}
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <h4 style={{ color: "#4b0082", marginBottom: "4px" }}>
//           ACADEMIC YEAR 2024-25
//         </h4>
//         <p style={{ color: "#a52a2a", lineHeight: "1.5" }}>
//           ATRIA INSTITUTE OF TECHNOLOGY,<br />
//           Adjacent Bangalore Baptist Hospital, Hebbal,<br />
//           Bengaluru - 560 024
//         </p>
//       </div>
//     </div>
//   );
// }


// client/src/pages/FDPAttended/Summary.jsx
import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";
import leftLogo from "../../asserts/atria-logo.png";
import rightLogo from "../../asserts/atria-25years.png";

export default function Summary() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    setFormData({ ...safeFormData, [field]: value });
  };

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Times, serif",
        backgroundColor: "#fff",
        padding: "48px 60px",
        width: "794px", // A4 width
        minHeight: "1123px", // A4 height
        margin: "24px auto",
        border: "1px solid #eee",
        borderRadius: 6,
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        boxSizing: "border-box",
      }}
    >
      {/* ---------- LOGO HEADER (top of page) ---------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <img
          src={leftLogo}
          alt="Atria Logo"
          style={{ height: 80, objectFit: "contain" }}
        />
        <img
          src={rightLogo}
          alt="25 Years Logo"
          style={{ height: 80, objectFit: "contain" }}
        />
      </div>

      {/* ---------- DEPARTMENT & PROGRAM ---------- */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2
          style={{
            color: "#a52a2a",
            fontWeight: "bold",
            fontSize: 24,
            margin: "6px 0",
          }}
        >
          Department of Computer Science &amp; Engineering
        </h2>
        <h3
          style={{
            color: "#a52a2a",
            fontSize: 18,
            margin: "6px 0",
          }}
        >
          Program:&nbsp;
          <span style={{ color: "#4b0082", fontWeight: "bold" }}>
            Computer Science &amp; Design
          </span>
        </h3>
      </div>

      {/* ---------- TITLE ---------- */}
      <h2
        style={{
          textAlign: "center",
          color: "#4b0082",
          textDecoration: "underline",
          fontSize: 20,
          margin: "18px 0 22px",
          fontWeight: 700,
        }}
      >
        ACTIVITY CONDUCTED REPORT
      </h2>

      {/* ---------- FORM TABLE ---------- */}
      <div
        style={{
          background: "#ead3d3",
          padding: "14px 18px",
          borderRadius: 2,
          marginBottom: 48,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {[
              ["Activity Name:", "activityName", "Enter Activity Name"],
              ["Co-ordinator:", "coordinator", "Enter Co-ordinator Name(s)"],
              ["Date:", "date", "", "date"],
              ["Duration:", "duration", "Enter Duration (e.g., 10:00 AM to 11:30 AM)"],
              ["PO & POs:", "pos", "Enter PO & POs (e.g., PO4, PO10)"],
            ].map(([label, field, placeholder, type = "text"], idx) => (
              <tr key={idx} style={{ verticalAlign: "middle" }}>
                <td
                  style={{
                    width: "28%",
                    padding: "10px 12px",
                    fontWeight: 700,
                    color: "#1b1b1b",
                  }}
                >
                  {label}
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <input
                    type={type}
                    name={field}
                    placeholder={placeholder}
                    value={safeFormData[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: 15,
                      color: "#333",
                      padding: 0,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer style={{ textAlign: "center", marginTop: 4 }}>
        <div style={{ color: "#4b0082", fontWeight: 700, marginBottom: 6 }}>
          ACADEMIC YEAR 2024-25
        </div>
        <div style={{ color: "#a52a2a", fontWeight: 700, lineHeight: 1.4 }}>
          ATRIA INSTITUTE OF TECHNOLOGY,
          <br />
          Adjacent Bangalore Baptist Hospital, Hebbal,
          <br />
          Bengaluru - 560 024
        </div>
      </footer>
    </div>
  );
}

