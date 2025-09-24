import express from "express";
import {
  createExpertTalk,
  getExpertTalks,
  generateExpertTalkReport,
} from "../controllers/expertTalkController.js";

const router = express.Router();

router.post("/", createExpertTalk);
router.get("/", getExpertTalks);
router.get("/report/:id", generateExpertTalkReport);

export default router;
