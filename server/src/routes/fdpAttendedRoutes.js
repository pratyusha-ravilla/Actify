

//server/src/routes/fdpAttendedRoutes.js

// import express from "express";
// import {
//   createFDPAttended,
//   getFDPAttended,
//   downloadFDPAttendedPDF,
//   downloadFDPAttendedWord,
// } from "../controllers/fdpAttendedController.js";

// const router = express.Router();

// // Create FDP Attended
// router.post("/", createFDPAttended);

// // Get all FDP Attended
// router.get("/", getFDPAttended);

// // Download PDF
// router.get("/:id/pdf", downloadFDPAttendedPDF);

// // Download Word
// router.get("/:id/word", downloadFDPAttendedWord);

// export default router;




import express from "express";
import {
  createFDPAttended,
  getFDPAttended,
  downloadFDPAttendedPDF,
  downloadFDPAttendedWord,
} from "../controllers/fdpAttendedController.js";

const router = express.Router();

// Create FDP Attended Record
router.post("/", createFDPAttended);

// Get All FDP Attended Records
router.get("/", getFDPAttended);

// Download as PDF
router.get("/:id/pdf", downloadFDPAttendedPDF);

// Download as Word
router.get("/:id/word", downloadFDPAttendedWord);

export default router;
