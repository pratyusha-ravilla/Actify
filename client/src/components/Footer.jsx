

//client/src/components/Footer.jsx

import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        py: 5,
        px: { xs: 2, md: 10 },
        background: "linear-gradient(135deg, #3f51b5, #1a237e)",
        color: "white",
      }}
    >
      <Grid container spacing={4}>
        {/* Column 1: About */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Actify Portal
          </Typography>
          <Typography variant="body2" sx={{ color: "#e3f2fd" }}>
            A platform to simplify faculty academic reporting and streamline
            documentation of FDPs, Expert Talks, and other academic activities.
          </Typography>
        </Grid>

        {/* Column 2: Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Quick Links
          </Typography>
          <Typography variant="body2" sx={{ color: "#e3f2fd" }}>
            Home
          </Typography>
          <Typography variant="body2" sx={{ color: "#e3f2fd" }}>
            About Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#e3f2fd" }}>
            Contact
          </Typography>
          <Typography variant="body2" sx={{ color: "#e3f2fd" }}>
            Login / Register
          </Typography>
        </Grid>

        {/* Column 3: Contact */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Connect With Us
          </Typography>
          <Box>
            <IconButton color="inherit" size="large">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" size="large">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" size="large">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" size="large">
              <EmailIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          mt: 4,
          pt: 3,
        }}
      >
        <Typography variant="body2" sx={{ color: "#c5cae9" }}>
          © {new Date().getFullYear()} Actify Portal — All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
