

// // //server/src/controllers/fdpAttendedControllers.js


// import FDPAttended from "../models/FDPAttended.js";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import {
//   generateFDPAttendedPDF,
//   generateFDPAttendedWord,
// } from "../utils/templateUtils.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Create FDP Attended
// export const createFDPAttended = async (req, res) => {
//   try {
//     // ✅ Support both "title" and "activityName" from frontend
//     const activityName = req.body.activityName || req.body.title || "";

//     if (!activityName) {
//       return res.status(400).json({ message: "Activity Name (Title) is required" });
//     }

//     const fdp = new FDPAttended({
//       activityName, // unified name
//       coordinator: req.body.coordinator || "",
//       date: req.body.date || "",
//       duration: req.body.duration || "",
//       pos: req.body.pos || "",
//       summary: req.body.summary || "",
//       toc: req.body.toc || "",
//       brochure: req.body.brochure || "",
//       geoTagPhotos: req.body.geoTagPhotos || [],
//       attendanceFile: req.body.attendanceFile || "",
//       attendance: req.body.attendance || [],
//       resourcePersons: req.body.resourcePersons || [],
//       feedback: req.body.feedback || "",
//       createdBy: req.body.createdBy || "faculty",
//     });

//     const savedFDP = await fdp.save();
//     res.status(201).json(savedFDP);
//   } catch (err) {
//     console.error("❌ Error creating FDP:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Get All FDP Attended
// export const getFDPAttended = async (req, res) => {
//   try {
//     const data = await FDPAttended.find().sort({ createdAt: -1 });
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("❌ Error fetching FDPs:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Download PDF
// // export const downloadFDPAttendedPDF = async (req, res) => {
// //   try {
// //     const fdp = await FDPAttended.findById(req.params.id);
// //     if (!fdp) return res.status(404).json({ message: "FDP not found" });

// //     const tempDir = path.join(__dirname, "../../temp");
// //     if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// //     const pdfPath = path.join(tempDir, `fdp_attended_${fdp._id}.pdf`);
// //     await generateFDPAttendedPDF(fdp, pdfPath);

// //     // ✅ Use activityName or fallback
// //     res.download(
// //       pdfPath,
// //       `${fdp.activityName || "FDP_Attended_Report"}.pdf`,
// //       (err) => {
// //         if (err) console.error(err);
// //         fs.unlinkSync(pdfPath);
// //       }
// //     );
// //   } catch (err) {
// //     console.error("❌ Error generating PDF:", err);
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// export const downloadFDPAttendedPDF = async (req, res) => {
//   try {
//     const fdp = await FDPAttended.findById(req.params.id);
//     if (!fdp) return res.status(404).json({ message: "FDP not found" });

//     const tempDir = path.join(__dirname, "../../temp");
//     if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

//     const pdfPath = path.join(tempDir, `fdp_attended_${fdp._id}.pdf`);
//     await generateFDPAttendedPDF(fdp, pdfPath);

//     res.download(pdfPath, `${fdp.activityName || "FDP_Attended_Report"}.pdf`, (err) => {
//       if (err) console.error(err);
//       if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
//     });
//   } catch (err) {
//     console.error("❌ Error generating PDF:", err);
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

//     // ✅ Use activityName or fallback
//     res.download(
//       wordPath,
//       `${fdp.activityName || "FDP_Attended_Report"}.docx`,
//       (err) => {
//         if (err) console.error(err);
//         fs.unlinkSync(wordPath);
//       }
//     );
//   } catch (err) {
//     console.error("❌ Error generating Word:", err);
//     res.status(500).json({ message: err.message });
//   }
// };





// // server/src/controllers/fdpAttendedController.js



// import FDPAttended from "../models/FDPAttended.js";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import {
//   generateFDPAttendedPDF,
//   generateFDPAttendedWord,
// } from "../utils/templateUtils.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Create FDP Attended
// export const createFDPAttended = async (req, res) => {
//   try {
//     const activityName = req.body.activityName || req.body.title || "";

//     if (!activityName) {
//       return res.status(400).json({ message: "Activity Name (Title) is required" });
//     }

//     const fdp = new FDPAttended({
//       activityName,
//       coordinator: req.body.coordinator || "",
//       date: req.body.date || "",
//       duration: req.body.duration || "",
//       pos: req.body.pos || "",
//       summary: req.body.summary || "",
//       toc: req.body.toc || "",
//       brochure: req.body.brochure || "",
//       geoTagPhotos: req.body.geoTagPhotos || [],
//       attendanceFile: req.body.attendanceFile || "",
//       attendance: req.body.attendance || [],
//       feedback: req.body.feedback || "",
//       createdBy: req.body.createdBy || "faculty",

//       // ✅ New fields
//       resourcePersons: req.body.resourcePersons || [], // [{name, designation, institution, email, phone, photo}]
//       otherInfo: req.body.otherInfo || "",
//     });

//     const savedFDP = await fdp.save();
//     res.status(201).json(savedFDP);
//   } catch (err) {
//     console.error("❌ Error creating FDP:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Get All FDP Attended
// export const getFDPAttended = async (req, res) => {
//   try {
//     const data = await FDPAttended.find().sort({ createdAt: -1 });
//     res.status(200).json(data);
//   } catch (err) {
//     console.error("❌ Error fetching FDPs:", err);
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

//     res.download(pdfPath, `${fdp.activityName || "FDP_Attended_Report"}.pdf`, (err) => {
//       if (err) console.error(err);
//       if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
//     });
//   } catch (err) {
//     console.error("❌ Error generating PDF:", err);
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

//     res.download(
//       wordPath,
//       `${fdp.activityName || "FDP_Attended_Report"}.docx`,
//       (err) => {
//         if (err) console.error(err);
//         if (fs.existsSync(wordPath)) fs.unlinkSync(wordPath);
//       }
//     );
//   } catch (err) {
//     console.error("❌ Error generating Word:", err);
//     res.status(500).json({ message: err.message });
//   }
// };





import FDPAttended from "../models/FDPAttended.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  generateFDPAttendedPDF,
  generateFDPAttendedWord,
} from "../utils/templateUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Create FDP Attended Record
export const createFDPAttended = async (req, res) => {
  try {
    const activityName = req.body.activityName || req.body.title || "";
    if (!activityName) {
      return res.status(400).json({ message: "Activity Name (Title) is required" });
    }

    // ✅ Ensure resourcePersons is an array (even if single object sent)
    let resourcePersons = [];
    if (Array.isArray(req.body.resourcePersons)) {
      resourcePersons = req.body.resourcePersons;
    } else if (req.body.resourcePersons) {
      resourcePersons = [req.body.resourcePersons];
    }

    // ✅ Create new record
    const fdp = new FDPAttended({
      activityName,
      coordinator: req.body.coordinator || "",
      date: req.body.date || "",
      duration: req.body.duration || "",
      pos: req.body.pos || "",
      summary: req.body.summary || "",
      toc: req.body.toc || "",
      brochure: req.body.brochure || [],
      geoTagPhotos: req.body.geoTagPhotos || [],
      attendanceFile: req.body.attendanceFile || "",
      attendance: req.body.attendance || [],
      resourcePersons: resourcePersons.map((rp) => ({
        name: rp.name || "",
        designation: rp.designation || "",
        institution: rp.institution || "",
        email: rp.email || "",
        phone: rp.phone || "",
        image: rp.image || "", // file path saved from upload
        otherInformation: rp.otherInformation || "",
      })),
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

// ✅ Get All FDP Attended Records
export const getFDPAttended = async (req, res) => {
  try {
    const data = await FDPAttended.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching FDPs:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update FDP Record (if needed)
export const updateFDPAttended = async (req, res) => {
  try {
    const { id } = req.params;
    const fdp = await FDPAttended.findById(id);
    if (!fdp) return res.status(404).json({ message: "FDP not found" });

    // ✅ Merge existing resource person data (retain old images if not replaced)
    const updatedResourcePersons = (req.body.resourcePersons || []).map((rp, idx) => {
      const existing = fdp.resourcePersons[idx] || {};
      return {
        name: rp.name || existing.name || "",
        designation: rp.designation || existing.designation || "",
        institution: rp.institution || existing.institution || "",
        email: rp.email || existing.email || "",
        phone: rp.phone || existing.phone || "",
        image: rp.image || existing.image || "",
        otherInformation: rp.otherInformation || existing.otherInformation || "",
      };
    });

    // ✅ Update fields
    Object.assign(fdp, {
      activityName: req.body.activityName || fdp.activityName,
      coordinator: req.body.coordinator || fdp.coordinator,
      date: req.body.date || fdp.date,
      duration: req.body.duration || fdp.duration,
      pos: req.body.pos || fdp.pos,
      summary: req.body.summary || fdp.summary,
      toc: req.body.toc || fdp.toc,
      brochure: req.body.brochure || fdp.brochure,
      geoTagPhotos: req.body.geoTagPhotos || fdp.geoTagPhotos,
      attendanceFile: req.body.attendanceFile || fdp.attendanceFile,
      attendance: req.body.attendance || fdp.attendance,
      resourcePersons: updatedResourcePersons,
      feedback: req.body.feedback || fdp.feedback,
      createdBy: req.body.createdBy || fdp.createdBy,
    });

    const updatedFDP = await fdp.save();
    res.status(200).json(updatedFDP);
  } catch (err) {
    console.error("❌ Error updating FDP:", err);
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
      if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
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

    res.download(
      wordPath,
      `${fdp.activityName || "FDP_Attended_Report"}.docx`,
      (err) => {
        if (err) console.error(err);
        fs.unlinkSync(wordPath);
      }
    );
  } catch (err) {
    console.error("❌ Error generating Word:", err);
    res.status(500).json({ message: err.message });
  }
};
