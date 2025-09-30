import React from "react";

const GeoTagPhotos = ({ data = [], onChange }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((f) => f.name);
    onChange([...data, ...files]);
  };

  return (
    <div>
      <h3>Geo-Tagged Photos</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <ul>
        {data.map((photo, idx) => (
          <li key={idx}>{photo}</li>
        ))}
      </ul>
    </div>
  );
};

export default GeoTagPhotos;
