// import ExpertTalk from "../models/ExpertTalk.js";
// import { generatePDF } from "../utils/pdfUtils.js";
// import path from "path";

// export const createExpertTalk = async (req, res) => {
//   try {
//     const talk = new ExpertTalk(req.body);
//     await talk.save();
//     res.status(201).json(talk);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getExpertTalks = async (req, res) => {
//   try {
//     const talks = await ExpertTalk.find();
//     res.json(talks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const generateExpertTalkReport = async (req, res) => {
//   try {
//     const talk = await ExpertTalk.findById(req.params.id);
//     if (!talk) return res.status(404).json({ message: "Not found" });

//     const filePath = path.join("reports", `expert_talk_${talk._id}.pdf`);
//     generatePDF(talk, filePath);

//     res.download(filePath);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




import ExpertTalk from "../models/ExpertTalk.js";
import path from "path";
import fs from "fs";
import {
  generateExpertTalkPDF,
  generateExpertTalkWord,
} from "../utils/templateUtils.js";

// ➕ Create Expert Talk
export const createExpertTalk = async (req, res) => {
  try {
    const talk = new ExpertTalk({
      title: req.body.title,
      summary: req.body.summary,
      toc: req.body.toc,
      brochure: req.body.brochure,
      resourcePersons: req.body.resourcePersons || [],
      geoTagPhotos: req.body.geoTagPhotos || [],
      attendanceFile: req.body.attendanceFile,
      feedback: req.body.feedback || {},
      createdBy: req.body.createdBy || "faculty",
    });

    await talk.save();
    res.status(201).json(talk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📂 Get All Expert Talks
export const getExpertTalks = async (req, res) => {
  try {
    const data = await ExpertTalk.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📝 Generate Expert Talk Report
export const generateExpertTalkReport = async (req, res) => {
  try {
    const talk = await ExpertTalk.findById(req.params.id);
    if (!talk) return res.status(404).json({ message: "Not found" });

    // Ensure reports folder exists
    const reportsDir = path.join("reports");
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

    // Define file paths
    const pdfPath = path.join(reportsDir, `expert_talk_${talk._id}.pdf`);
    const wordPath = path.join(reportsDir, `expert_talk_${talk._id}.docx`);

    // Generate PDF & Word
    await generateExpertTalkPDF(talk, pdfPath);
    await generateExpertTalkWord(talk, wordPath);

    res.json({
      message: "Reports generated successfully",
      pdf: `/reports/expert_talk_${talk._id}.pdf`,
      word: `/reports/expert_talk_${talk._id}.docx`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

