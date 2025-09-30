
// import React, { useState } from "react";

// export default function GeoTagPhotos({ formData, setFormData }) {
//   const [photo, setPhoto] = useState("");

//   const handleAddPhoto = () => {
//     if (!photo) return;
//     const updatedPhotos = [...(formData.geoTagPhotos || []), photo];
//     setFormData({ ...formData, geoTagPhotos: updatedPhotos });
//     setPhoto("");
//   };

//   return (
//     <div>
//       <h2>Geo Tag Photos</h2>
//       <input
//         type="text"
//         placeholder="Enter photo URL"
//         value={photo}
//         onChange={(e) => setPhoto(e.target.value)}
//       />
//       <button onClick={handleAddPhoto}>Add Photo</button>

//       <div>
//         <h3>Added Photos:</h3>
//         <ul>
//           {(formData.geoTagPhotos || []).map((p, index) => (
//             <li key={index}>{p}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function GeoTagPhotos() {
//   const { formData, updateFormData } = useContext(FDPAttendedContext);

//   const handleFileChange = (e) => {
//     updateFormData("geoTagPhotos", Array.from(e.target.files));
//   };

//   return (
//     <div>
//       <h2>Geo Tag Photos</h2>
//       <input type="file" multiple onChange={handleFileChange} />
//       <ul>
//         {formData.geoTagPhotos.map((file, i) => (
//           <li key={i}>{file.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// import { useContext } from "react";
// import { FDPAttendedContext } from "../../context/FDPAttendedContext";

// export default function GeoTagPhotos() {
//   const { formData, setFormData } = useContext(FDPAttendedContext);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, geoTagPhotos: files });
//   };

//   return (
//     <div>
//       <h2>Geo-Tag Photos</h2>
//       <input type="file" multiple onChange={handleFileChange} />
//       <p>{formData.geoTagPhotos.length} photo(s) selected</p>
//     </div>
//   );
// }







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
