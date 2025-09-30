// import React from "react";

// export default function TOC({ formData, setFormData }) {
//   const handleChange = (e) => {
//     setFormData({ ...formData, toc: e.target.value });
//   };

//   return (
//     <div>
//       <h2>Table of Contents</h2>
//       <textarea
//         value={formData.toc || ""}
//         onChange={handleChange}
//         placeholder="Enter table of contents"
//       />
//     </div>
//   );
// }



// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function TOC() {
//   const { formData, updateFormData } = useContext(FDPAttendedContext);

//   return (
//     <div>
//       <h2>Table of Contents</h2>
//       <textarea
//         placeholder="Enter TOC"
//         value={formData.toc}
//         onChange={(e) => updateFormData("toc", e.target.value)}
//       />
//     </div>
//   );
// }



import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function TOC() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  return (
    <div>
      <h2>Table of Contents</h2>
      <textarea
        value={formData.toc}
        onChange={(e) => setFormData({ ...formData, toc: e.target.value })}
        rows="5"
        cols="50"
      />
    </div>
  );
}
