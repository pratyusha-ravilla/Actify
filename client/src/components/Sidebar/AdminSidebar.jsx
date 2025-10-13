import React from "react";
import { Home, Users, ClipboardCheck, FileText, Settings, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <Home size={20} /> },
    { name: "Manage Faculty", path: "/manage-faculty", icon: <Users size={20} /> },
    { name: "Approve FDPs", path: "/approve-fdps", icon: <ClipboardCheck size={20} /> },
    { name: "Reports", path: "/reports", icon: <FileText size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
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
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}>Admin Panel</h2>
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

export default AdminSidebar;
