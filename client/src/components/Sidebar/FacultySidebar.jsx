

//client/components/Sidebar/FacultySidebar.jsx

import React from "react";
import { Home, BookOpen, Presentation, Users, FileText, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const FacultySidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/faculty-dashboard", icon: <Home size={20} /> },
    { name: "My FDPs", path: "/my-fdps", icon: <BookOpen size={20} /> },
    { name: "Conducted Events", path: "/conducted-events", icon: <Presentation size={20} /> },
    { name: "Expert Talks", path: "/expert-talks", icon: <Users size={20} /> },
    { name: "Templates", path: "/templates", icon: <FileText size={20} /> },
  ];

  return (
    <div style={{
      width: "240px",
      height: "100vh",
      backgroundColor: "#1e293b",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "fixed",
      left: 0,
      top: 0,
      padding: "20px",
    }}>
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}>Faculty Panel</h2>
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#cbd5e1",
              marginBottom: "10px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#334155")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#ef4444",
          border: "none",
          padding: "10px 12px",
          borderRadius: "8px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
        }}
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default FacultySidebar;
