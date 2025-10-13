//server/src/routes/authRoutes.js

import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Debug route (to test if router is mounted correctly)
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

// Auth routes
router.post("/register", register);
router.post("/login", login);

export default router;
