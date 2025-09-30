


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function TemplatePreview() {
//   const { state } = useLocation();
//   const data = state?.data;
//   const navigate = useNavigate();

//   if (!data) return <p>No data available for preview.</p>;

//   const handleProceedToDownload = () => {
//     navigate("/download", { state: { data } });
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>FDP Attended Preview</h1>
//       <h2>{data.title}</h2>
//       <h3>Summary</h3>
//       <p>{data.summary}</p>

//       <h3>Table of Contents</h3>
//       <p>{data.toc}</p>

//       <h3>Resource Persons</h3>
//       <ul>
//         {data.resourcePersons?.map((rp, idx) => (
//           <li key={idx}>{rp.name} - {rp.designation} ({rp.institution})</li>
//         ))}
//       </ul>

//       <h3>Brochure</h3>
//       <p>{data.brochure}</p>

//       <h3>Geo Tag Photos</h3>
//       <ul>
//         {data.geoTagPhotos?.map((photo, idx) => (
//           <li key={idx}>{photo}</li>
//         ))}
//       </ul>

//       <h3>Attendance File</h3>
//       <p>{data.attendanceFile}</p>

//       <h3>Feedback</h3>
//       <pre>{JSON.stringify(data.feedback, null, 2)}</pre>

//       <button
//         style={{ marginTop: "20px", padding: "10px 15px", backgroundColor: "#1976d2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
//         onClick={handleProceedToDownload}
//       >
//         Proceed to Download
//       </button>
//     </div>
//   );
// }




import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TemplatePreview() {
  const { state } = useLocation();
  const data = state?.data;
  const navigate = useNavigate();

  if (!data) return <p>No data available for preview.</p>;

  const handleProceedToDownload = () => {
    // Update path to match the route
    navigate("/download", { state: { data } });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>FDP Attended Preview</h1>
      <h2>{data.title}</h2>
      <h3>Summary</h3>
      <p>{data.summary}</p>

      <h3>Table of Contents</h3>
      <p>{data.toc}</p>

      <h3>Resource Persons</h3>
      <ul>
        {data.resourcePersons?.map((rp, idx) => (
          <li key={idx}>
            {rp.name} - {rp.designation} ({rp.institution})
          </li>
        ))}
      </ul>

      <h3>Brochure</h3>
      <p>{data.brochure}</p>

      <h3>Geo Tag Photos</h3>
      <ul>
        {data.geoTagPhotos?.map((photo, idx) => (
          <li key={idx}>{photo}</li>
        ))}
      </ul>

      <h3>Attendance File</h3>
      <p>{data.attendanceFile}</p>

      <h3>Feedback</h3>
      <pre>{JSON.stringify(data.feedback, null, 2)}</pre>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleProceedToDownload}
      >
        Proceed to Download
      </button>
    </div>
  );
}
