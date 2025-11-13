

//server/src/server.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

// ✅ Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing! Please check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB first, then start the server
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`✅ MongoDB connected successfully: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });


  