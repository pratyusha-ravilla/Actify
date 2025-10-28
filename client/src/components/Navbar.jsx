// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
//       <Link to="/" style={{ color: "#fff", marginRight: "10px" }}>Dashboard</Link>
//       <Link to="/fdp-attended" style={{ color: "#fff", marginRight: "10px" }}>FDP Attended</Link>
//       <Link to="/fdp-conducted" style={{ color: "#fff", marginRight: "10px" }}>FDP Conducted</Link>
//       <Link to="/expert-talks" style={{ color: "#fff" }}>Expert Talk</Link>
//     </nav>
//   );
// }

import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navStyle = {
    backgroundColor: "#3f51b5",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#ffeb3b" : "white",
    textDecoration: "none",
    margin: "0 15px",
    fontWeight: "500",
    transition: "0.3s",
  });

  return (
    <nav style={navStyle}>
      <h2 style={{ margin: 0, fontWeight: "bold" }}>ACTIFY</h2>
      <div>
        <Link style={linkStyle("/")} to="/">Home</Link>
        <Link style={linkStyle("/about")} to="/about">About</Link>
        <Link style={linkStyle("/contact")} to="/contact">Contact</Link>
        <Link style={linkStyle("/login")} to="/login">Login</Link>
        <Link style={linkStyle("/register")} to="/register">Register</Link>
      </div>
    </nav>
  );
}


