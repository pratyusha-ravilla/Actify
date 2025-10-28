
// //client/src/pages/FDPAttended/Attendance.jsx

// import { useContext, useState } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function Attendance() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);
//   const [name, setName] = useState("");
//   const [file, setFile] = useState(null);

//   // Handle adding attendee name
//   const addName = () => {
//     if (name.trim()) {
//       setFormData({
//         ...formData,
//         attendance: [...(formData.attendance || []), name],
//       });
//       setName("");
//     }
//   };

//   // Handle file upload (PDF/DOC)
//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     if (uploadedFile) {
//       const allowedTypes = [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];

//       if (!allowedTypes.includes(uploadedFile.type)) {
//         alert("Please upload a valid PDF or Word document.");
//         e.target.value = "";
//         return;
//       }

//       // Save file in context
//       setFile(uploadedFile);
//       setFormData({
//         ...formData,
//         files: [...(formData.files || []), uploadedFile],
//       });
//     }
//   };

//   // Handle file preview/download
//   const handleFilePreview = (file) => {
//     const fileURL = URL.createObjectURL(file);
//     window.open(fileURL);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Attendance</h2>

//       <div style={styles.inputGroup}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter attendee name"
//           style={styles.input}
//         />
//         <button onClick={addName} style={styles.button}>
//           Add
//         </button>
//       </div>

//       <ul style={styles.list}>
//         {(formData.attendance || []).map((n, i) => (
//           <li key={i}>{n}</li>
//         ))}
//       </ul>

//       <hr style={{ margin: "20px 0" }} />

//       <h3>Upload Attendance Files (PDF or DOC)</h3>
//       <input
//         type="file"
//         accept=".pdf,.doc,.docx"
//         onChange={handleFileChange}
//         style={styles.fileInput}
//       />

//       <ul style={styles.fileList}>
//         {(formData.files || []).map((f, i) => (
//           <li key={i}>
//             {f.name}
//             <button onClick={() => handleFilePreview(f)} style={styles.previewBtn}>
//               View
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: "20px",
//     background: "#f8f9fa",
//     borderRadius: "10px",
//     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//     maxWidth: "500px",
//     margin: "20px auto",
//   },
//   title: {
//     textAlign: "center",
//     color: "#333",
//   },
//   inputGroup: {
//     display: "flex",
//     gap: "10px",
//     marginTop: "10px",
//   },
//   input: {
//     flex: 1,
//     padding: "8px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: "8px 16px",
//     background: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   list: {
//     marginTop: "15px",
//   },
//   fileInput: {
//     marginTop: "10px",
//   },
//   fileList: {
//     marginTop: "10px",
//   },
//   previewBtn: {
//     marginLeft: "10px",
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "5px",
//     padding: "4px 8px",
//     cursor: "pointer",
//   },
// };



import { useContext, useState } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";
import leftLogo from "../../asserts/atria-logo.png";
import rightLogo from "../../asserts/atria-25years.png";

export default function Attendance() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const [previews, setPreviews] = useState([]);

  // Handle file upload (images)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setFormData({ ...formData, attendanceFiles: fileNames });

    // For preview display
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
        ATTENDANCE
      </h2>

      {/* ---------- ATTENDANCE IMAGE(S) ---------- */}
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
                alt={`Attendance-${index + 1}`}
                style={{
                  width: "16.75cm",
                  height: "20.91cm",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#666", fontStyle: "italic" }}>
          No attendance file uploaded yet.
        </p>
      )}

      {/* ---------- FILE UPLOAD ---------- */}
      <div style={{ textAlign: "center", marginTop: "2cm" }}>
        <h3 style={{ color: "#4B0082" }}>Upload Attendance Sheet (Image)</h3>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} />
        {formData.attendanceFiles?.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              marginTop: "1rem",
              color: "#4B0082",
              fontWeight: "bold",
            }}
          >
            {formData.attendanceFiles.map((file, i) => (
              <li key={i}>{file}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
