
import express from "express";
import cors from "cors";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import fdpAttendedRoutes from "./routes/fdpAttendedRoutes.js";
import fdpConductedRoutes from "./routes/fdpConductedRoutes.js";
import expertTalkRoutes from "./routes/expertTalkRoutes.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve generated reports as static files
app.use("/reports", express.static("reports"));

// Debug route (root check)
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/fdp-attended", fdpAttendedRoutes);
app.use("/api/fdp-conducted", fdpConductedRoutes);
app.use("/api/expert-talks", expertTalkRoutes); // keep plural for consistency
app.use("/api/test", testRoutes);

export default app;
