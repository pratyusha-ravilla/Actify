// server/src/controllers/fdpTemplateController.js
import path from "path";
import fs from "fs";
import FDPAttended from "../models/FDPAttended.js";
import { fdpAttendedTemplateBase } from "../utils/fdpTemplateBase.js";
import {
  generateFDPAttendedPDF,
  generateFDPAttendedTemplateWord,
} from "../utils/fdpTemplateUtils.js";

// ✅ GET base FDP Attended template
export const getFDPTemplate = async (req, res) => {
  try {
    res.status(200).json({
      message: "Base FDP Attended template loaded successfully",
      template: fdpAttendedTemplateBase,
    });
  } catch (err) {
    console.error("❌ Error fetching FDP template:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Download generated PDF
export const downloadFDPTemplatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const fdp = await FDPAttended.findById(id).lean();
    if (!fdp) return res.status(404).json({ message: "FDP not found" });

    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const pdfPath = path.join(tempDir, `fdp_attended_${id}.pdf`);
    await generateFDPAttendedPDF(fdp, pdfPath);

    return res.download(
      pdfPath,
      `${(fdp.activityName || "FDP_Attended_Report").replace(/\//g, "_")}.pdf`,
      (err) => {
        if (err) console.error("Error sending PDF:", err);
        try {
          if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath);
        } catch (e) {}
      }
    );
  } catch (err) {
    console.error("❌ Error generating PDF:", err);
    res.status(500).json({ message: err.message });
  }
};


// ✅ Download generated Word (DOCX)
export const downloadFDPTemplateWord = async (req, res) => {
  try {
    const { id } = req.params;
    const fdp = await FDPAttended.findById(id).lean();
    if (!fdp) return res.status(404).json({ message: "FDP not found" });

    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    // ✅ Always save with .docx extension
    const wordPath = path.join(tempDir, `fdp_attended_${id}.docx`);

    // ✅ Generate the actual DOCX file
    await generateFDPAttendedTemplateWord(fdp, wordPath);

    // ✅ Send correct Content-Type and filename
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${(fdp.activityName || "FDP_Attended_Report")
        .replace(/\//g, "_")}.docx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // ✅ Stream the file to client
    const fileStream = fs.createReadStream(wordPath);
    fileStream.pipe(res);
    fileStream.on("end", () => {
      try {
        if (fs.existsSync(wordPath)) fs.unlinkSync(wordPath);
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    });
  } catch (err) {
    console.error("❌ Error generating Word:", err);
    res.status(500).json({ message: err.message });
  }
};

