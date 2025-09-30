
// import React, { useState } from "react";

// export default function Attendance({ formData, setFormData }) {
//   const [attendee, setAttendee] = useState("");

//   const handleAddAttendee = () => {
//     if (!attendee) return;
//     const updatedList = [...(formData.attendance || []), attendee];
//     setFormData({ ...formData, attendance: updatedList });
//     setAttendee("");
//   };

//   return (
//     <div>
//       <h2>Attendance</h2>
//       <input
//         type="text"
//         placeholder="Enter attendee name"
//         value={attendee}
//         onChange={(e) => setAttendee(e.target.value)}
//       />
//       <button onClick={handleAddAttendee}>Add Attendee</button>

//       <div>
//         <h3>Attendees List:</h3>
//         <ul>
//           {(formData.attendance || []).map((a, index) => (
//             <li key={index}>{a}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function Attendance() {
//   const { formData, updateFormData } = useContext(FDPAttendedContext);

//   const handleFileChange = (e) => {
//     updateFormData("attendanceFile", e.target.files[0]);
//   };

//   return (
//     <div>
//       <h2>Attendance</h2>
//       <input type="file" onChange={handleFileChange} />
//       {formData.attendanceFile && <p>{formData.attendanceFile.name}</p>}
//     </div>
//   );
// }




import { useContext, useState } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function Attendance() {
  const { formData, setFormData } = useContext(FDPAttendedContext);
  const [name, setName] = useState("");

  const addName = () => {
    if (name.trim()) {
      setFormData({
        ...formData,
        attendance: [...formData.attendance, name],
      });
      setName("");
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addName}>Add</button>
      <ul>
        {formData.attendance.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
