

//server/src/app.js

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import fdpAttendedRoutes from "./routes/fdpAttendedRoutes.js";
import fdpConductedRoutes from "./routes/fdpConductedRoutes.js";
import expertTalkRoutes from "./routes/expertTalkRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import templateRoutes from "./routes/templateRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Serve generated reports
app.use("/reports", express.static("reports"));

// Root health check
app.get("/", (req, res) => res.send("✅ API is running..."));

// API Routes
// app.use("/api/fdp-attended", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/fdp-attended", fdpAttendedRoutes);
app.use("/api/fdp-conducted", fdpConductedRoutes);
app.use("/api/expert-talks", expertTalkRoutes);
app.use("/api/test", testRoutes);
app.use("/saveFDPServer", templateRoutes);
// app.use("/api/fdp-attended", uploadRoutes);


export default app;
