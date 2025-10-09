
//client/src/pages/FDPAttended/GeoTagPhotos.jsx

import { useContext } from "react";
import { FDPAttendedContext } from "../../context/FDPAttendedContext";

export default function GeoTagPhotos() {
  const { formData, setFormData } = useContext(FDPAttendedContext);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map(file => file.name); // ✅ only strings
    setFormData({ ...formData, geoTagPhotos: fileNames });
  };

  return (
    <div>
      <h2>Upload Geo-Tagged Photos</h2>
      <input type="file" multiple onChange={handleFileChange} />
      {formData.geoTagPhotos?.length > 0 && (
        <ul>
          {formData.geoTagPhotos.map((photo, i) => (
            <li key={i}>{photo}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
