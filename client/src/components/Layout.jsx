// src/components/Layout.jsx
import React from "react";
import { Box } from "@mui/material";
import AdminSidebar from "./Sidebar/AdminSidebar";
import FacultySidebar from "./Sidebar/FacultySidebar";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const { user } = useAuth();
  const sidebarWidth = 260;

  return (
    <Box sx={{ display: "flex" }}>
      {user?.role === "admin" ? <AdminSidebar /> : <FacultySidebar />}
      <Box sx={{ flexGrow: 1, ml: `${sidebarWidth}px`, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
