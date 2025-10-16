
//client/src/pages/FDPAttended/Summary.jsx




// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function Summary() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);

//   const safeFormData = formData || {};

//   return (
//     <div>
//       <h2>Summary</h2>

//       <label>Title:</label>
//       <input
//         type="text"
//         placeholder="Enter title"
//         value={safeFormData.title || ""}
//         onChange={(e) =>
//           setFormData({ ...safeFormData, title: e.target.value })
//         }
//       />
//       <br />

//       <label>Date:</label>
//       <input
//         type="date"
//         value={safeFormData.date || ""}
//         onChange={(e) =>
//           setFormData({ ...safeFormData, date: e.target.value })
//         }
//       />
//       <br />

//       <label>Venue:</label>
//       <input
//         type="text"
//         placeholder="Enter venue"
//         value={safeFormData.venue || ""}
//         onChange={(e) =>
//           setFormData({ ...safeFormData, venue: e.target.value })
//         }
//       />
//     </div>
//   );
// }




// client/src/pages/FDPAttended/Summary.jsx
import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function Summary() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const safeFormData = formData || {};

  const handleChange = (field, value) => {
    setFormData({ ...safeFormData, [field]: value });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Summary</h2>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Activity Name:</strong></label><br />
        <input
          type="text"
          placeholder="Enter Activity Name"
          value={safeFormData.activityName || ""}
          onChange={(e) => handleChange("activityName", e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Co-ordinator:</strong></label><br />
        <input
          type="text"
          placeholder="Enter Co-ordinator Name(s)"
          value={safeFormData.coordinator || ""}
          onChange={(e) => handleChange("coordinator", e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Date:</strong></label><br />
        <input
          type="date"
          value={safeFormData.date || ""}
          onChange={(e) => handleChange("date", e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Duration:</strong></label><br />
        <input
          type="text"
          placeholder="Enter Duration (e.g., 11:00 to 12:30 PM)"
          value={safeFormData.duration || ""}
          onChange={(e) => handleChange("duration", e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>PO & POs:</strong></label><br />
        <input
          type="text"
          placeholder="Enter PO & POs (e.g., PO5)"
          value={safeFormData.pos || ""}
          onChange={(e) => handleChange("pos", e.target.value)}
          style={{ width: "100%", padding: "5px" }}
        />
      </div>
    </div>
  );
}
