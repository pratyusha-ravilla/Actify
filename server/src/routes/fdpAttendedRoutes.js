

// //server/src/routes/fdpAttendedRoutes.js


// import express from "express";
// import {
//   createFDPAttended,
//   getFDPAttended,
//   downloadFDPAttendedPDF,
//   downloadFDPAttendedWord,
// } from "../controllers/fdpAttendedController.js";

// const router = express.Router();

// // Create FDP Attended Record
// router.post("/", createFDPAttended);

// // Get All FDP Attended Records
// router.get("/", getFDPAttended);

// // Download as PDF
// router.get("/:id/pdf", downloadFDPAttendedPDF);

// // Download as Word
// router.get("/:id/word", downloadFDPAttendedWord);

// export default router;





// server/src/routes/fdpAttendedRoutes.js


// import express from "express";
// import {
//   createFDPAttended,
//   getFDPAttended,
//   downloadFDPAttendedPDF,
//   downloadFDPAttendedWord,
// } from "../controllers/fdpAttendedController.js";

// const router = express.Router();

// // Create FDP Attended Record
// router.post("/", createFDPAttended);

// // Get All FDP Attended Records
// router.get("/", getFDPAttended);

// // Download as PDF
// router.get("/:id/pdf", downloadFDPAttendedPDF);

// // Download as Word
// router.get("/:id/word", downloadFDPAttendedWord);

// export default router;




import express from "express";
import {
  createFDPAttended,
  getFDPAttended,
  updateFDPAttended,
  downloadFDPAttendedPDF,
  downloadFDPAttendedWord,
} from "../controllers/fdpAttendedController.js";

const router = express.Router();

// Create FDP Attended Record
router.post("/", createFDPAttended);

// Get All FDP Attended Records
router.get("/", getFDPAttended);

// Update FDP Attended Record
router.put("/:id", updateFDPAttended);

// Download as PDF
router.get("/:id/pdf", downloadFDPAttendedPDF);

// Download as Word
router.get("/:id/word", downloadFDPAttendedWord);

export default router;
