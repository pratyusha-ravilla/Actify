


//client/src/Dashboard//dashboard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Presentation, Users, FileText, Bell, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Calendar helper
const generateCalendar = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const weeks = [];
  let week = Array(firstDay).fill(null);
  for (let day = 1; day <= lastDate; day++) {
    week.push(day);
    if (week.length === 7 || day === lastDate) {
      weeks.push(week);
      week = [];
    }
  }
  return weeks;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [calendar] = useState(generateCalendar());

  const cards = [
    { title: "FDP Attended", desc: "View and manage FDPs attended by faculty.", icon: <BookOpen size={36} />, color: "linear-gradient(135deg, #ff9a9e, #fad0c4)", route: "/fdp-attended" },
    { title: "FDP Conducted", desc: "Add and track FDPs conducted in your institute.", icon: <Presentation size={36} />, color: "linear-gradient(135deg, #a18cd1, #fbc2eb)", route: "/fdp-conducted" },
    { title: "Expert Talks", desc: "Manage expert sessions and seminars.", icon: <Users size={36} />, color: "linear-gradient(135deg, #fbc2eb, #a6c1ee)", route: "/expert-talks" },
    { title: "Templates", desc: "Access pre-built templates for reports.", icon: <FileText size={36} />, color: "linear-gradient(135deg, #43e97b, #38f9d7)", route: "/template-preview" },
  ];

  const stats = [
    { title: "Total FDPs Attended", value: 24, color: "#ff6a6a" },
    { title: "Total FDPs Conducted", value: 12, color: "#fbbf24" },
    { title: "Expert Talks", value: 8, color: "#60a5fa" },
    { title: "Templates Available", value: 10, color: "#34d399" },
    { title: "Pending Approvals", value: 5, color: "#f472b6" },
  ];

  const recentActivities = [
    { type: "Attended", desc: "Prof. Sharma attended AI FDP on 02-Oct-2025" },
    { type: "Conducted", desc: "Prof. Rao conducted Python Workshop on 30-Sep-2025" },
    { type: "Template", desc: "Template for AI FDP report added" },
    { type: "ExpertTalk", desc: "Expert Talk by Dr. Mehta on Data Science" },
    { type: "Attended", desc: "Prof. Singh attended ML FDP on 01-Oct-2025" },
    { type: "Conducted", desc: "Prof. Mehta conducted AI Workshop on 28-Sep-2025" },
  ];

  const notifications = [
    "New FDP report added by Prof. Sharma",
    "Template updated for Python Workshop",
    "Expert Talk scheduled for next week",
    "Dashboard layout improved",
  ];

  const upcomingEvents = [
    { title: "Python Workshop", date: "15-Oct-2025" },
    { title: "AI FDP", date: "20-Oct-2025" },
    { title: "Expert Talk: Data Science", date: "25-Oct-2025" },
  ];

  const fdpData = [
    { month: "Jan", Attended: 2, Conducted: 1 },
    { month: "Feb", Attended: 3, Conducted: 2 },
    { month: "Mar", Attended: 1, Conducted: 1 },
    { month: "Apr", Attended: 4, Conducted: 2 },
    { month: "May", Attended: 2, Conducted: 3 },
    { month: "Jun", Attended: 3, Conducted: 1 },
    { month: "Jul", Attended: 2, Conducted: 2 },
  ];

  const topContributors = [
    { name: "Prof. Sharma", fdp: 5 },
    { name: "Prof. Rao", fdp: 4 },
    { name: "Prof. Mehta", fdp: 3 },
  ];

  const topDepartments = [
    { name: "CSE", fdp: 12 },
    { name: "IT", fdp: 9 },
    { name: "ECE", fdp: 7 },
  ];

  const latestReports = [
    { title: "AI FDP Report", type: "Template", date: "02-Oct-2025" },
    { title: "Python Workshop Report", type: "Template", date: "30-Sep-2025" },
    { title: "Data Science Expert Talk", type: "ExpertTalk", date: "28-Sep-2025" },
  ];

  const tips = [
    "Always document FDPs for better reporting.",
    "Collaborate with peers to conduct joint workshops.",
    "Use templates to save time in reporting.",
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "Attended": return <BookOpen size={20} color="#34d399" />;
      case "Conducted": return <Presentation size={20} color="#fbbf24" />;
      case "Template": return <FileText size={20} color="#f472b6" />;
      case "ExpertTalk": return <Users size={20} color="#60a5fa" />;
      default: return null;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "Attended": return "#34d399";
      case "Conducted": return "#fbbf24";
      case "Template": return "#f472b6";
      case "ExpertTalk": return "#60a5fa";
      default: return "#ccc";
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Roboto, sans-serif", backgroundColor: "#f0f4f8" }}>
      {/* Top Notifications & Upcoming Events */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px", background: "#fff", borderRadius: "12px", padding: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Bell size={20} color="#f87171" />
            <h3 style={{ fontWeight: "600", fontSize: "1rem" }}>Notifications</h3>
          </div>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9rem", color: "#374151" }}>
            {notifications.map((note, idx) => (
              <li key={idx} style={{ marginBottom: "6px", padding: "6px 0", borderBottom: "1px solid #e5e7eb" }}>{note}</li>
            ))}
          </ul>
        </div>

        <div style={{ flex: "1 1 300px", background: "#fff", borderRadius: "12px", padding: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <Calendar size={20} color="#fbbf24" />
            <h3 style={{ fontWeight: "600", fontSize: "1rem" }}>Upcoming Events</h3>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {upcomingEvents.map((event, idx) => (
              <li key={idx} style={{ marginBottom: "10px", padding: "8px 10px", borderRadius: "8px", background: "#fef9c3" }}>
                <strong>{event.title}</strong> - <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>{event.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Welcome Section */}
      <section style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#1e293b" }}>Welcome Back 👋</h1>
        <p style={{ fontSize: "1rem", color: "#475569", marginTop: "6px" }}>Overview of academic activities, reports, and insights.</p>
      </section>

      {/* Stats */}
      <section style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 180px",
              backgroundColor: stat.color,
              color: "#fff",
              padding: "18px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>{stat.title}</h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "8px" }}>{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Quick Action Cards */}
      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px", color: "#1e293b" }}>Quick Actions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              style={{
                cursor: "pointer",
                background: card.color,
                color: "#fff",
                borderRadius: "12px",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "10px", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600" }}>{card.title}</h3>
              </div>
              <p style={{ marginTop: "10px", fontSize: "0.85rem", color: "rgba(255,255,255,0.9)" }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FDP Trend Chart */}
      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px", color: "#1e293b" }}>FDP Trend (Monthly)</h2>
        <div style={{ width: "100%", height: "350px", background: "#fff", borderRadius: "15px", padding: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fdpData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Attended" stroke="#34d399" strokeWidth={3} />
              <Line type="monotone" dataKey="Conducted" stroke="#fbbf24" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

            {/* Top Contributors & Top Departments */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
        {/* Top Contributors */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontWeight: "600", fontSize: "1.2rem", marginBottom: "12px" }}>Top Contributors</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {topContributors.map((contributor, idx) => (
              <li key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e5e7eb" }}>
                <span>{contributor.name}</span>
                <span style={{ fontWeight: "600", color: "#34d399" }}>{contributor.fdp} FDPs</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Departments */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "18px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontWeight: "600", fontSize: "1.2rem", marginBottom: "12px" }}>Top Departments</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {topDepartments.map((dept, idx) => (
              <li key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e5e7eb" }}>
                <span>{dept.name}</span>
                <span style={{ fontWeight: "600", color: "#fbbf24" }}>{dept.fdp} FDPs</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

     

      {/* Latest Reports */}
      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px", color: "#1e293b" }}>Latest Reports</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
          {latestReports.map((report, idx) => (
            <div key={idx} style={{ background: "#fff", borderRadius: "12px", padding: "15px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
              <h3 style={{ fontWeight: "600", fontSize: "1rem" }}>{report.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "6px 0" }}>{report.type}</p>
              <p style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{report.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips & Insights */}
      <section style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px", color: "#1e293b" }}>Tips & Insights</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
          {tips.map((tip, idx) => (
            <div key={idx} style={{ background: "#fef3c7", borderRadius: "12px", padding: "15px", boxShadow: "0 6px 15px rgba(0,0,0,0.05)" }}>
              <p style={{ fontSize: "0.95rem", color: "#92400e" }}>💡 {tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "15px", color: "#1e293b" }}>Recent Activity</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recentActivities.map((activity, index) => (
            <li key={index} style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#fff",
              padding: "12px 15px",
              borderRadius: "10px",
              marginBottom: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              transition: "all 0.3s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f9ff")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <span>{getActivityIcon(activity.type)}</span>
              <p style={{ flexGrow: 1 }}>{activity.desc}</p>
              <span style={{
                backgroundColor: getBadgeColor(activity.type),
                color: "#fff",
                borderRadius: "12px",
                padding: "2px 10px",
                fontSize: "0.75rem",
                fontWeight: "600",
                textTransform: "uppercase"
              }}>{activity.type}</span>
            </li>
          ))}
        </ul>
      </section>


    
    </div>
  );
};

export default Dashboard;






