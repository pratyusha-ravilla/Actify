
// import React, { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// const UploadBrochure = () => {
//   const { formData, setFormData } = useContext(FDPAttendedContext);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, brochure: file });
//   };

//   return (
//     <div>
//       <h2>Upload Brochure</h2>
//       <input type="file" onChange={handleUpload} />
//     </div>
//   );
// };

// export default UploadBrochure;




// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function UploadBrochure() {
//   const { formData, updateFormData } = useContext(FDPAttendedContext);

//   const handleFileChange = (e) => {
//     updateFormData("brochure", e.target.files[0]);
//   };

//   return (
//     <div>
//       <h2>Upload Brochure</h2>
//       <input type="file" onChange={handleFileChange} />
//       {formData.brochure && <p>{formData.brochure.name}</p>}
//     </div>
//   );
// }





// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function UploadBrochure() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, brochure: e.target.files[0] });
//   };

//   return (
//     <div>
//       <h2>Upload Brochure</h2>
//       <input type="file" onChange={handleFileChange} />
//       {formData.brochure && <p>Selected: {formData.brochure.name}</p>}
//     </div>
//   );
// }



import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function UploadBrochure() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Option 1: Just store filename (temporary, for DB compatibility)
      setFormData({ ...formData, brochure: file.name });

      
    }
  };

  return (
    <div>
      <h2>Upload Brochure</h2>
      <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleFileChange} />
      {formData.brochure && <p>Selected: {formData.brochure}</p>}
    </div>
  );
}
