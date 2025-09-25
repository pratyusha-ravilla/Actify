// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// import fdpAttendedRoutes from "./routes/fdpAttendedRoutes.js";
// import fdpConductedRoutes from "./routes/fdpConductedRoutes.js";
// import expertTalkRoutes from "./routes/expertTalkRoutes.js";
// import authRoutes from "./routes/authRoutes.js"; // ✅ import auth routes

// const app = express();
// const PORT = 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/reports", express.static("reports"));

// // Debug root
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Routes
// app.use("/api/fdp-attended", fdpAttendedRoutes);
// app.use("/api/fdp-conducted", fdpConductedRoutes);
// app.use("/api/expert-talks", expertTalkRoutes);
// app.use("/api/auth", authRoutes); // ✅ mount auth routes

// // MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/actify")
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => console.error("❌ MongoDB connection error:", err));



import mongoose from "mongoose";
import app from "./app.js"; // import app from app.js

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/actify";

// Connect to MongoDB and start server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log("✅ Connected to MongoDB");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
