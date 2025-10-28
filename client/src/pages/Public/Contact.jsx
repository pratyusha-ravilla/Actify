//client/src/pages/Public/Contact.jsx

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace these with your actual EmailJS IDs
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";
    const publicKey = "YOUR_PUBLIC_KEY";

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setSuccess(true);
        setOpen(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setSuccess(false);
        setOpen(true);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #c5cae9 0%, #bbdefb 40%, #90caf9 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={10}
            sx={{
              p: 6,
              borderRadius: 6,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(240,248,255,0.95))",
              backdropFilter: "blur(15px)",
              boxShadow:
                "0 8px 25px rgba(63,81,181,0.25), inset 0 1px 2px rgba(255,255,255,0.6)",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <MailOutlineIcon sx={{ fontSize: 60, color: "#3f51b5", mb: 1 }} />
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{ color: "#1a237e", mb: 1 }}
              >
                Contact Us
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                We'd love to hear from you! Fill out the form below and our team
                will get back to you soon.
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{
                      style: { color: "#1a237e", fontWeight: 500 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "& fieldset": { borderColor: "#c5cae9" },
                        "&:hover fieldset": { borderColor: "#3f51b5" },
                        "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{
                      style: { color: "#1a237e", fontWeight: 500 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "& fieldset": { borderColor: "#c5cae9" },
                        "&:hover fieldset": { borderColor: "#3f51b5" },
                        "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{
                      style: { color: "#1a237e", fontWeight: 500 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "& fieldset": { borderColor: "#c5cae9" },
                        "&:hover fieldset": { borderColor: "#3f51b5" },
                        "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={5}
                    required
                    InputLabelProps={{
                      style: { color: "#1a237e", fontWeight: 500 },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        "& fieldset": { borderColor: "#c5cae9" },
                        "&:hover fieldset": { borderColor: "#3f51b5" },
                        "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    fullWidth
                    sx={{
                      mt: 1,
                      py: 1.5,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)",
                      textTransform: "none",
                      fontWeight: 600,
                      letterSpacing: 0.5,
                      boxShadow: "0 6px 20px rgba(63,81,181,0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 10px 25px rgba(63,81,181,0.4)",
                        background:
                          "linear-gradient(135deg, #3949ab 0%, #5c6bc0 100%)",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </motion.div>

        {/* Snackbar for success/error messages */}
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={success ? "success" : "error"}
            sx={{ width: "100%" }}
            onClose={() => setOpen(false)}
          >
            {success
              ? "Message sent successfully!"
              : "Failed to send message. Please try again."}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

