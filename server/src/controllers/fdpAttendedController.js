import FDPAttended from "../models/FDPAttended.js";
import path from "path";
import fs from "fs";
import { generateFDPAttendedPDF, generateFDPAttendedWord } from "../utils/templateUtils.js";

// ➕ Create FDP Attended
export const createFDPAttended = async (req, res) => {
  try {
    const fdp = new FDPAttended({
      title: req.body.title || "",
      summary: req.body.summary || "",
      toc: req.body.toc || "",
      brochure: req.body.brochure || "",
      resourcePersons: req.body.resourcePersons || [],
      geoTagPhotos: req.body.geoTagPhotos || [],
      attendanceFile: req.body.attendanceFile || "",
      feedback: req.body.feedback || {},
      createdBy: req.body.createdBy || "faculty",
    });

    await fdp.save();
    res.status(201).json(fdp);
  } catch (err) {
    console.error("Error creating FDP Attended:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📂 Get All FDP Attended
export const getFDPAttended = async (req, res) => {
  try {
    const data = await FDPAttended.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching FDP Attended:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📝 Generate FDP Attended Report (PDF & Word)
export const generateFDPAttendedReport = async (req, res) => {
  try {
    const fdp = await FDPAttended.findById(req.params.id);
    if (!fdp) return res.status(404).json({ message: "FDP record not found" });

    // Ensure reports folder exists
    const reportsDir = path.join("reports");
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

    // File paths
    const pdfPath = path.join(reportsDir, `fdp_attended_${fdp._id}.pdf`);
    const wordPath = path.join(reportsDir, `fdp_attended_${fdp._id}.docx`);

    // Generate PDF & Word using templates
    await generateFDPAttendedPDF(fdp, pdfPath);
    await generateFDPAttendedWord(fdp, wordPath);

    // Send download links
    res.status(200).json({
      message: "Reports generated successfully",
      pdf: `/reports/fdp_attended_${fdp._id}.pdf`,
      word: `/reports/fdp_attended_${fdp._id}.docx`,
    });
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: err.message });
  }
};
