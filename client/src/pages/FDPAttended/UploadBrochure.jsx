
//client/src/pages/FDPAttended/UploadBrochure.jsx

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
