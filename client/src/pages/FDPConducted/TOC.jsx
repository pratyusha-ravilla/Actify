import React from "react";

const TOC = ({ data, onChange }) => {
  return (
    <div>
      <h3>Table of Contents</h3>
      <textarea
        value={data || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Table of Contents..."
        rows="5"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default TOC;
