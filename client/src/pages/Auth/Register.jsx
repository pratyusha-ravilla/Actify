

// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, MenuItem, Alert } from "@mui/material";

const roles = [
  { value: "faculty", label: "Faculty" },
  { value: "hod", label: "HOD" },
  { value: "principal", label: "Principal" },
  { value: "admin", label: "Admin" },
];

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "faculty" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.role) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess(res.data.message);

      // Redirect to login after 1.5s
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
        Register
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
        />
        <TextField
          label="Role"
          name="role"
          select
          fullWidth
          margin="normal"
          value={form.role}
          onChange={handleChange}
        >
          {roles.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
