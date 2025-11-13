


//server/src/routes/expertTalkRoutes.js

import express from "express";
import {
  createExpertTalk,
  getExpertTalks,
  generateExpertTalkReport,
} from "../controllers/expertTalkController.js";

const router = express.Router();

// Create Expert Talk
router.post("/", createExpertTalk);

// Get all Expert Talks
router.get("/", getExpertTalks);

// Generate report for a specific Expert Talk
router.get("/:id/report", generateExpertTalkReport);

export default router;
