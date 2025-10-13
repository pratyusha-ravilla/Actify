//client/src/components/Sidebar.jsx




import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import {
  Dashboard,
  Book,
  People,
  Description,
  Person,
  Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { title: "Dashboard", path: "/", icon: <Dashboard /> },
    { title: "FDP Attended", path: "/fdp-attended", icon: <Book /> },
    { title: "FDP Conducted", path: "/fdp-conducted", icon: <People /> },
    { title: "Expert Talks", path: "/expert-talks", icon: <Description /> },
  ];

  // Colors
  const sidebarBg = "linear-gradient(180deg, #8ec5fc, #e0c3fc)"; // soft gradient
  const hoverBg = "linear-gradient(90deg, #fbc2eb, #a6c1ee)"; // soft pink-blue
  const activeBg = "linear-gradient(90deg, #cfd9df, #e2ebf0)"; // active tile
  const iconHoverColor = "#ff6f61"; // coral
  const buttonHoverPrimary = "#6fa8dc";
  const buttonHoverError = "#f28b82";

  return (
    <Box
      sx={{
        width: 260, // fixed width
        minHeight: "100vh",
        position: "fixed", // fixed to the page
        background: sidebarBg,
        color: "#2c3e50",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        boxShadow:
          "5px 10px 20px rgba(0,0,0,0.1), inset 0 -3px 8px rgba(255,255,255,0.2)",
        borderRadius: 2,
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 5, gap: 2 }}>
        <Avatar
          src={logo}
          sx={{
            width: 50,
            height: 50,
            borderRadius: 2,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}
        />
        <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 1 }}>
          Actify
        </Typography>
      </Box>

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1 }}>
        {navLinks.map((link) => (
          <ListItem key={link.title} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={location.pathname === link.path}
              onClick={() => navigate(link.path)}
              sx={{
                width: "100%", // all tiles same width
                borderRadius: 2,
                py: 1.5,
                px: 2,
                color: "#2c3e50",
                background:
                  location.pathname === link.path ? activeBg : "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: hoverBg,
                  transform: "translateX(5px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#2c3e50",
                  minWidth: 0,
                  justifyContent: "center",
                  "&:hover": { color: iconHoverColor },
                }}
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.title} sx={{ ml: 2, fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Bottom Section: Profile & Logout */}
      <Box>
        <Divider sx={{ bgcolor: "rgba(44,62,80,0.3)", my: 3 }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            startIcon={<Person />}
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              "&:hover": { bgcolor: buttonHoverPrimary },
              transition: "all 0.3s",
            }}
          >
            Profile
          </Button>
          <Button
            startIcon={<Logout />}
            fullWidth
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              "&:hover": { bgcolor: buttonHoverError },
              transition: "all 0.3s",
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
