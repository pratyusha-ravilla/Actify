import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Dashboard</Link>
      <Link to="/fdp-attended" style={{ color: "#fff", marginRight: "10px" }}>FDP Attended</Link>
      <Link to="/fdp-conducted" style={{ color: "#fff", marginRight: "10px" }}>FDP Conducted</Link>
      <Link to="/expert-talks" style={{ color: "#fff" }}>Expert Talk</Link>
    </nav>
  );
}
