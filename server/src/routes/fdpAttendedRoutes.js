import express from "express";
import {
  createFDPAttended,
  getFDPAttended,
  generateFDPAttendedReport,
} from "../controllers/fdpAttendedController.js";

const router = express.Router();

router.post("/", createFDPAttended);
router.get("/", getFDPAttended);
router.get("/report/:id", generateFDPAttendedReport);

export default router;
