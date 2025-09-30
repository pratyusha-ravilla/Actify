
// import React from "react";

// export default function Summary({ formData, setFormData }) {
//   const handleChange = (e) => {
//     setFormData({ ...formData, title: e.target.value });
//   };

//   return (
//     <div>
//       <h2>Summary</h2>
//       <label>
//         Title:
//         <input
//           type="text"
//           value={formData.title || ""}
//           onChange={handleChange}
//           placeholder="Enter title"
//         />
//       </label>

//       <label>
//         Summary:
//         <textarea
//           value={formData.summary || ""}
//           onChange={(e) =>
//             setFormData({ ...formData, summary: e.target.value })
//           }
//           placeholder="Enter summary"
//         />
//       </label>
//     </div>
//   );
// }



// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function Summary() {
//   const { formData, updateFormData } = useContext(FDPAttendedContext);

//   return (
//     <div>
//       <h2>Summary</h2>
//       <input
//         type="text"
//         placeholder="Enter Title"
//         value={formData.title}
//         onChange={(e) => updateFormData("title", e.target.value)}
//       />
//       <textarea
//         placeholder="Enter Summary"
//         value={formData.summary}
//         onChange={(e) => updateFormData("summary", e.target.value)}
//       />
//     </div>
//   );
// }



import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function Summary() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  return (
    <div>
      <h2>Summary</h2>
      <label>Title:</label>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <br />

      <label>Date:</label>
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <br />

      <label>Venue:</label>
      <input
        type="text"
        value={formData.venue}
        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
      />
    </div>
  );
}
