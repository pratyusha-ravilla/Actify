
//client/src/pages/FDPAttended/Attendance.jsx

import { useContext, useState } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function Attendance() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  // Handle adding attendee name
  const addName = () => {
    if (name.trim()) {
      setFormData({
        ...formData,
        attendance: [...(formData.attendance || []), name],
      });
      setName("");
    }
  };

  // Handle file upload (PDF/DOC)
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(uploadedFile.type)) {
        alert("Please upload a valid PDF or Word document.");
        e.target.value = "";
        return;
      }

      // Save file in context
      setFile(uploadedFile);
      setFormData({
        ...formData,
        files: [...(formData.files || []), uploadedFile],
      });
    }
  };

  // Handle file preview/download
  const handleFilePreview = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Attendance</h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter attendee name"
          style={styles.input}
        />
        <button onClick={addName} style={styles.button}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {(formData.attendance || []).map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>

      <hr style={{ margin: "20px 0" }} />

      <h3>Upload Attendance Files (PDF or DOC)</h3>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        style={styles.fileInput}
      />

      <ul style={styles.fileList}>
        {(formData.files || []).map((f, i) => (
          <li key={i}>
            {f.name}
            <button onClick={() => handleFilePreview(f)} style={styles.previewBtn}>
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "20px auto",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  inputGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: {
    marginTop: "15px",
  },
  fileInput: {
    marginTop: "10px",
  },
  fileList: {
    marginTop: "10px",
  },
  previewBtn: {
    marginLeft: "10px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "4px 8px",
    cursor: "pointer",
  },
};



