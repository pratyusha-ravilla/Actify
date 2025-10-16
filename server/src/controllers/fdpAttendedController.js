

// //server/src/controllers/fdpAttendedControllers.js


// import FDPAttended from "../models/FDPAttended.js";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { generateFDPAttendedPDF, generateFDPAttendedWord } from "../utils/templateUtils.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Create FDP Attended
// export const createFDPAttended = async (req, res) => {
//   try {
//     const fdp = new FDPAttended({
//       activityName: req.body.activityName || "",  // ✅ updated field
//       coordinator: req.body.coordinator || "",    // ✅ added
//       date: req.body.date || "",
//       duration: req.body.duration || "",          // ✅ added
//       pos: req.body.pos || "",                    // ✅ added

//       summary: req.body.summary || "",
//       toc: req.body.toc || "",
//       brochure: req.body.brochure || "",
//       geoTagPhotos: req.body.geoTagPhotos || [],
//       attendanceFile: req.body.attendanceFile || "",
//       attendance: req.body.attendance || [],
//       resourcePersons: req.body.resourcePersons || [],
//       feedback: req.body.feedback || {},
//       createdBy: req.body.createdBy || "faculty",
//     });

//     const savedFDP = await fdp.save();
//     res.status(201).json(savedFDP);
//   } catch (err) {
//     console.error("Error creating FDP:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Get all FDP Attended
// export const getFDPAttended = async (req, res) => {
//   try {
//     const data = await FDPAttended.find().sort({ createdAt: -1 });
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("Error fetching FDPs:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Download PDF
// export const downloadFDPAttendedPDF = async (req, res) => {
//   try {
//     const fdp = await FDPAttended.findById(req.params.id);
//     if (!fdp) return res.status(404).json({ message: "FDP not found" });

//     const tempDir = path.join(__dirname, "../../temp");
//     if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

//     const pdfPath = path.join(tempDir, `fdp_attended_${fdp._id}.pdf`);
//     await generateFDPAttendedPDF(fdp, pdfPath);

//     res.download(pdfPath, `${fdp.activityName || "fdp_attended"}.pdf`, (err) => {
//       if (err) console.error(err);
//       fs.unlinkSync(pdfPath); // remove temp file after download
//     });
//   } catch (err) {
//     console.error("Error generating PDF:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Download Word
// export const downloadFDPAttendedWord = async (req, res) => {
//   try {
//     const fdp = await FDPAttended.findById(req.params.id);
//     if (!fdp) return res.status(404).json({ message: "FDP not found" });

//     const tempDir = path.join(__dirname, "../../temp");
//     if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

//     const wordPath = path.join(tempDir, `fdp_attended_${fdp._id}.docx`);
//     await generateFDPAttendedWord(fdp, wordPath);

//     res.download(wordPath, `${fdp.activityName || "fdp_attended"}.docx`, (err) => {
//       if (err) console.error(err);
//       fs.unlinkSync(wordPath); // remove temp file after download
//     });
//   } catch (err) {
//     console.error("Error generating Word:", err);
//     res.status(500).json({ message: err.message });
//   }
// };






import FDPAttended from "../models/FDPAttended.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { generateFDPAttendedPDF, generateFDPAttendedWord } from "../utils/templateUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create FDP Attended
export const createFDPAttended = async (req, res) => {
  try {
    const fdp = new FDPAttended({
      activityName: req.body.activityName || "",
      coordinator: req.body.coordinator || "",
      date: req.body.date || "",
      duration: req.body.duration || "",
      pos: req.body.pos || "",
      summary: req.body.summary || "",
      toc: req.body.toc || "",
      brochure: req.body.brochure || "",
      geoTagPhotos: req.body.geoTagPhotos || [],
      attendanceFile: req.body.attendanceFile || "",
      attendance: req.body.attendance || [],
      resourcePersons: req.body.resourcePersons || [],
      feedback: req.body.feedback || "",
      createdBy: req.body.createdBy || "faculty",
    });

    const savedFDP = await fdp.save();
    res.status(201).json(savedFDP);
  } catch (err) {
    console.error("❌ Error creating FDP:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get All FDP Attended
export const getFDPAttended = async (req, res) => {
  try {
    const data = await FDPAttended.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching FDPs:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Download PDF
export const downloadFDPAttendedPDF = async (req, res) => {
  try {
    const fdp = await FDPAttended.findById(req.params.id);
    if (!fdp) return res.status(404).json({ message: "FDP not found" });

    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const pdfPath = path.join(tempDir, `fdp_attended_${fdp._id}.pdf`);
    await generateFDPAttendedPDF(fdp, pdfPath);

    res.download(pdfPath, `${fdp.activityName || "FDP_Attended_Report"}.pdf`, (err) => {
      if (err) console.error(err);
      fs.unlinkSync(pdfPath);
    });
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Download Word
export const downloadFDPAttendedWord = async (req, res) => {
  try {
    const fdp = await FDPAttended.findById(req.params.id);
    if (!fdp) return res.status(404).json({ message: "FDP not found" });

    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const wordPath = path.join(tempDir, `fdp_attended_${fdp._id}.docx`);
    await generateFDPAttendedWord(fdp, wordPath);

    res.download(wordPath, `${fdp.activityName || "FDP_Attended_Report"}.docx`, (err) => {
      if (err) console.error(err);
      fs.unlinkSync(wordPath);
    });
  } catch (err) {
    console.error("❌ Error generating Word:", err);
    res.status(500).json({ message: err.message });
  }
};
