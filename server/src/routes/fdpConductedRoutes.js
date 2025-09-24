import express from "express";
import {
  createFDPConducted,
  getFDPConducted,
  generateFDPConductedReport,
} from "../controllers/fdpConductedController.js";

const router = express.Router();

router.post("/", createFDPConducted);
router.get("/", getFDPConducted);
router.get("/report/:id", generateFDPConductedReport);

export default router;
