
import express from "express";
import {
  createFDPAttended,
  getFDPAttended,
  generateFDPAttendedReport,
} from "../controllers/fdpAttendedController.js";

const router = express.Router();

// Create FDP Attended
router.post("/", createFDPAttended);

// Get all FDP Attended
router.get("/", getFDPAttended);

// Generate report for a specific FDP Attended
router.get("/:id/report", generateFDPAttendedReport);

export default router;
