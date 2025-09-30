import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome to Actify Dashboard</h1>
      <p>Select a module to proceed:</p>

      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate("/fdp-attended")}>
          FDP Attended
        </div>
        <div className="dashboard-card" onClick={() => navigate("/fdp-conducted")}>
          FDP Conducted
        </div>
        <div className="dashboard-card" onClick={() => navigate("/expert-talk")}>
          Expert Talk
        </div>
        <div className="dashboard-card" onClick={() => navigate("/template")}>
          Templates
        </div>
        <div className="dashboard-card" onClick={() => navigate("/download")}>
          Download Reports
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





// import React, { useEffect, useState } from "react";
// import { getAllFDPAttended } from "../../services/fdpAttendedService";
// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const [fdpList, setFdpList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getAllFDPAttended();
//       setFdpList(data);
//     };
//     fetchData();
//   }, []);

//   const handlePreview = (fdp) => {
//     navigate("/template-preview", { state: { data: fdp } });
//   };

//   return (
//     <div className="dashboard">
//       <h1>FDP Attended Dashboard</h1>
//       {fdpList.length === 0 ? (
//         <p>No FDP Attended records found.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Created By</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fdpList.map((fdp) => (
//               <tr key={fdp._id}>
//                 <td>{fdp.title}</td>
//                 <td>{fdp.createdBy}</td>
//                 <td>
//                   <button onClick={() => handlePreview(fdp)}>Preview</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }



// import { useNavigate } from "react-router-dom";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   return (
//     <div className="dashboard-container">
//       <h1>Actify Dashboard</h1>
//       <div className="options">
//         <button onClick={() => navigate("/fdp-attended")}>FDP Attended</button>
//         <button onClick={() => navigate("/fdp-conducted")}>FDP Conducted</button>
//         <button onClick={() => navigate("/expert-talks")}>Expert Talk</button>
//       </div>
//     </div>
//   );
// }
