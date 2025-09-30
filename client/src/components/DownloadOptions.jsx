import React from "react";
import "./DownloadOptions.css";

const DownloadOptions = ({ onDownload }) => {
  return (
    <div className="download-options">
      <button onClick={() => onDownload("pdf")}>⬇ Download PDF</button>
      <button onClick={() => onDownload("word")}>⬇ Download Word</button>
    </div>
  );
};

export default DownloadOptions;
