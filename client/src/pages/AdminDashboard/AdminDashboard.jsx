import React from "react";
import { Users, FileText, ClipboardCheck, BarChart3, Settings } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const AdminDashboard = () => {
  const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f472b6"];

  const departmentStats = [
    { name: "CSE", value: 12 },
    { name: "IT", value: 9 },
    { name: "ECE", value: 7 },
    { name: "MECH", value: 5 },
  ];

  const pendingApprovals = [
    { title: "FDP Attended - Prof. Sharma", date: "02-Oct-2025" },
    { title: "Expert Talk - Data Science", date: "03-Oct-2025" },
    { title: "FDP Conducted - Python Workshop", date: "04-Oct-2025" },
  ];

  const managementCards = [
    {
      title: "Manage Faculty",
      desc: "View, approve, or remove faculty members.",
      icon: <Users size={36} />,
      color: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    },
    {
      title: "Approve FDPs",
      desc: "Review FDP reports submitted by faculty.",
      icon: <ClipboardCheck size={36} />,
      color: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    },
    {
      title: "Reports Overview",
      desc: "Access summarized institute-level reports.",
      icon: <FileText size={36} />,
      color: "linear-gradient(135deg, #84fab0, #8fd3f4)",
    },
    {
      title: "Settings",
      desc: "Manage departments, permissions, and access.",
      icon: <Settings size={36} />,
      color: "linear-gradient(135deg, #fddb92, #d1fdff)",
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f4f8", fontFamily: "Roboto, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "20px" }}>Admin Dashboard 🏫</h1>
      <p style={{ color: "#475569", marginBottom: "30px" }}>
        Overview of all departments, faculty activity, and pending approvals.
      </p>

      {/* Quick Management Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {managementCards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: card.color,
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
              color: "#1f2937",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {card.icon}
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{card.title}</h3>
            </div>
            <p style={{ marginTop: "10px", fontSize: "0.9rem" }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Department FDP Distribution */}
      <div style={{ background: "#fff", borderRadius: "15px", padding: "25px", boxShadow: "0 8px 25px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px" }}>FDP Distribution by Department</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentStats}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {departmentStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pending Approvals */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 25px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px" }}>Pending Approvals</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {pendingApprovals.map((approval, idx) => (
            <li key={idx} style={{
              background: "#f9fafb",
              borderRadius: "10px",
              padding: "12px 15px",
              marginBottom: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ fontWeight: "500" }}>{approval.title}</span>
              <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>{approval.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
