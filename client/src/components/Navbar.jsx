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



import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Menu, Person, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { title: "Dashboard", path: "/" },
    { title: "FDP Attended", path: "/fdp-attended" },
    { title: "FDP Conducted", path: "/fdp-conducted" },
    { title: "Expert Talk", path: "/expert-talks" },
  ];

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={6}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* Left: Logo + Brand */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={logo} alt="Logo" sx={{ width: 50, height: 50 }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
                "&:hover": { color: "yellow" },
              }}
            >
              Actify
            </Typography>
          </Box>

          {/* Center: Nav Links for md+ */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                to={link.path}
                color="inherit"
                sx={{ fontWeight: "bold" }}
              >
                {link.title}
              </Button>
            ))}
          </Box>

          {/* Right: User Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "white", display: { xs: "none", sm: "block" } }}>
              Welcome, Faculty 👋
            </Typography>

            {/* Profile & Logout buttons */}
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              color="secondary"
              startIcon={<Person />}
            >
              Profile
            </Button>
            <Button
              component={Link}
              to="/logout"
              variant="contained"
              color="error"
              startIcon={<Logout />}
            >
              Logout
            </Button>

            {/* Hamburger Menu for mobile */}
            <IconButton
              color="inherit"
              edge="start"
              sx={{ display: { md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ "& .MuiDrawer-paper": { width: 250, backgroundColor: "#3f51b5", color: "white" } }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
          <Avatar src={logo} alt="Logo" sx={{ width: 50, height: 50, mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Actify
          </Typography>
        </Box>
        <Divider sx={{ bgcolor: "white" }} />

        <List>
          {navLinks.map((link) => (
            <ListItem key={link.title} disablePadding>
              <ListItemButton
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}



