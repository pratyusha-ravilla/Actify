

// //server/src/app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import fdpAttendedRoutes from "./routes/fdpAttendedRoutes.js";
import fdpConductedRoutes from "./routes/fdpConductedRoutes.js";
import expertTalkRoutes from "./routes/expertTalkRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";

dotenv.config(); // ✅ Load .env first
console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Debug log to verify env is loaded

connectDB(); // ✅ Connect to MongoDB

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reports", express.static("reports"));

app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/fdp-attended", fdpAttendedRoutes);
app.use("/api/fdp-conducted", fdpConductedRoutes);
app.use("/api/expert-talks", expertTalkRoutes);
app.use("/api/test", testRoutes);
app.use("/saveFDPServer", templateRoutes);

export default app;


