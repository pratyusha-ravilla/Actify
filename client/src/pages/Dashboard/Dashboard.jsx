import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Actify Activity Dashboard</h1>
      <div className="dashboard-cards">
        <Link to="/fdp-attended"><div className="card">FDP Attended</div></Link>
        <Link to="/fdp-conducted"><div className="card">FDP Conducted</div></Link>
        <Link to="/expert-talk"><div className="card">Expert Talk</div></Link>
      </div>
    </div>
  );
}
