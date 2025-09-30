import React from "react";

const Attendance = ({ data, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file ? file.name : "");
  };

  return (
    <div>
      <h3>Attendance</h3>
      <input type="file" onChange={handleFileChange} />
      {data && <p>Uploaded: {data}</p>}
    </div>
  );
};

export default Attendance;
