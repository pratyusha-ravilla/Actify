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
        <div className="dashboard-card" onClick={() => navigate("/expert-talks")}>
          Expert Talk
        </div>
        <div className="dashboard-card" onClick={() => navigate("/template-preview")}>
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






