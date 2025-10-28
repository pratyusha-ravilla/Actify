//client/src/pages/Public/AboutUs.jsx

import React from "react";
import { Container, Typography, Paper, Box, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e8f0fe 0%, #f5f7fa 100%)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ color: "#1a237e" }}
          >
            About Actify
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Empowering Faculty. Streamlining Academic Excellence.
          </Typography>
        </motion.div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 5,
              borderRadius: 4,
              backgroundColor: "white",
              mb: 6,
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              <b>Actify</b> is a digital faculty management platform built to
              simplify academic activity tracking and reporting. It provides an
              easy and efficient way to record, verify, and generate reports for
              activities like Faculty Development Programs (FDPs), Expert Talks,
              and Research Contributions.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Designed for modern educational institutions, Actify bridges the
              gap between faculty and administration by promoting
              transparency, accuracy, and accessibility of academic records.
              Our goal is to eliminate manual documentation processes and
              empower educators to focus on teaching and research.
            </Typography>
          </Paper>
        </motion.div>

        {/* Mission & Vision Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "#e8eaf6",
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  🎯 Our Mission
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  To empower faculty members and administrators by offering a
                  digital ecosystem that simplifies activity management,
                  enhances productivity, and ensures data accuracy for academic
                  growth and institutional excellence.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "#e3f2fd",
                  height: "100%",
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  🌟 Our Vision
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  To be the leading academic management platform that redefines
                  how educational institutions handle faculty data — ensuring
                  every achievement, contribution, and milestone is recognized
                  and celebrated digitally.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        {/* Core Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            sx={{ color: "#1a237e", mb: 4 }}
          >
            What Makes Actify Unique?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Seamless Record Management",
                desc: "Easily upload, edit, and manage FDPs, Expert Talks, and academic activities — all in one place.",
              },
              {
                title: "Smart Report Generation",
                desc: "Generate beautifully formatted PDF and Word reports instantly, ready for submission or archiving.",
              },
              {
                title: "Secure Cloud Storage",
                desc: "Your data is stored safely with authentication and role-based access controls.",
              },
              {
                title: "User-Friendly Dashboard",
                desc: "An intuitive and visually appealing dashboard for effortless navigation and data insights.",
              },
            ].map((feature, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Paper
                  elevation={5}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    height: "100%",
                    transition: "0.3s",
                    "&:hover": {
                      backgroundColor: "#f1f8ff",
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
