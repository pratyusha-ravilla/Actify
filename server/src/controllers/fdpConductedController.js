
//server/src/controllers/fdpConductedControllers.js

import FDPConducted from "../models/FDPConducted.js";
import path from "path";
import fs from "fs";
import {
  generateFDPConductedPDF,
  generateFDPConductedWord,
} from "../utils/templateUtils.js";

// ➕ Create FDP Conducted
export const createFDPConducted = async (req, res) => {
  try {
    const fdp = new FDPConducted({
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

    await fdp.save();
    res.status(201).json(fdp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📂 Get All FDP Conducted
export const getFDPConducted = async (req, res) => {
  try {
    const data = await FDPConducted.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📝 Generate FDP Conducted Report
export const generateFDPConductedReport = async (req, res) => {
  try {
    const fdp = await FDPConducted.findById(req.params.id);
    if (!fdp) return res.status(404).json({ message: "Not found" });

    // Ensure reports folder exists
    const reportsDir = path.join("reports");
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

    // Define file paths
    const pdfPath = path.join(reportsDir, `fdp_conducted_${fdp._id}.pdf`);
    const wordPath = path.join(reportsDir, `fdp_conducted_${fdp._id}.docx`);

    // Generate PDF & Word
    await generateFDPConductedPDF(fdp, pdfPath);
    await generateFDPConductedWord(fdp, wordPath);

    res.json({
      message: "Reports generated successfully",
      pdf: `/reports/fdp_conducted_${fdp._id}.pdf`,
      word: `/reports/fdp_conducted_${fdp._id}.docx`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


