


// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      // Save user info in AuthContext
      setAuthData({
        token: res.data.token,
        role: res.data.role,
        name: res.data.name,
        email: form.email,
      });

      // Redirect based on role
      if (["admin", "hod", "principal"].includes(res.data.role)) {
        navigate("/admin-dashboard");
      } else if (res.data.role === "faculty") {
        navigate("/faculty-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Login failed");
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
        Login
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
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
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
