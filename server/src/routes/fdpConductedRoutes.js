

//server/src/routes/fdpConductedRoutes.js


import express from "express";
import {
  createFDPConducted,
  getFDPConducted,
  generateFDPConductedReport,
} from "../controllers/fdpConductedController.js";

const router = express.Router();

// Create FDP Conducted
router.post("/", createFDPConducted);

// Get all FDP Conducted
router.get("/", getFDPConducted);

// Generate report for a specific FDP Conducted
router.get("/:id/report", generateFDPConductedReport);

export default router;
