
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



import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function TOC() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  return (
    <div>
      <h2>Table of Contents</h2>
      <textarea
        placeholder="Enter table of contents"
        value={formData.toc || ""}
        onChange={(e) => setFormData({ ...formData, toc: e.target.value })}
      />
    </div>
  );
}
