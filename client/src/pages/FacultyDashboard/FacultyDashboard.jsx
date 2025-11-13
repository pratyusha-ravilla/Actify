


//client/src/pages/FacultyDashboard/FacultyDashboard.jsx

import React from "react";
import { BookOpen, Presentation, Users, FileText, Calendar } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const FacultyDashboard = () => {
  const activityData = [
    { month: "Jan", FDPs: 2, Talks: 1 },
    { month: "Feb", FDPs: 3, Talks: 2 },
    { month: "Mar", FDPs: 1, Talks: 1 },
    { month: "Apr", FDPs: 4, Talks: 2 },
  ];

  const cards = [
    { title: "My FDPs", desc: "View and manage your attended FDPs.", icon: <BookOpen size={36} />, color: "linear-gradient(135deg, #ff9a9e, #fad0c4)" },
    { title: "Conducted Events", desc: "Track your organized FDPs.", icon: <Presentation size={36} />, color: "linear-gradient(135deg, #a18cd1, #fbc2eb)" },
    { title: "Expert Talks", desc: "Your conducted and attended talks.", icon: <Users size={36} />, color: "linear-gradient(135deg, #fbc2eb, #a6c1ee)" },
    { title: "Templates", desc: "Access and edit report templates.", icon: <FileText size={36} />, color: "linear-gradient(135deg, #43e97b, #38f9d7)" },
  ];

  const upcoming = [
    { title: "Python Workshop", date: "15-Oct-2025" },
    { title: "AI FDP", date: "22-Oct-2025" },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f4f8", fontFamily: "Roboto, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "20px" }}>Faculty Dashboard 👩‍🏫</h1>
      <p style={{ color: "#475569", marginBottom: "30px" }}>Track your academic engagements and upcoming activities.</p>

      {/* Quick Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: card.color,
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
              cursor: "pointer",
              color: "#fff",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {card.icon}
              <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{card.title}</h3>
            </div>
            <p style={{ marginTop: "8px", fontSize: "0.9rem" }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Activity Chart */}
      <div style={{ background: "#fff", borderRadius: "15px", padding: "25px", boxShadow: "0 8px 25px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px" }}>Monthly FDP & Talk Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="FDPs" fill="#60a5fa" />
            <Bar dataKey="Talks" fill="#fbbf24" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Events */}
      <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
          <Calendar size={22} color="#f59e0b" />
          <h3 style={{ fontWeight: "600", fontSize: "1.2rem" }}>Upcoming Events</h3>
        </div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {upcoming.map((event, idx) => (
            <li key={idx} style={{ padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
              <strong>{event.title}</strong> — <span style={{ color: "#6b7280" }}>{event.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FacultyDashboard;
