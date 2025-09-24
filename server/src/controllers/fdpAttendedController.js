import FDPAttended from "../models/FDPAttended.js";
import { generatePDF } from "../utils/pdfUtils.js";
import path from "path";

export const createFDPAttended = async (req, res) => {
  try {
    const fdp = new FDPAttended(req.body);
    await fdp.save();
    res.status(201).json(fdp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFDPAttended = async (req, res) => {
  try {
    const data = await FDPAttended.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const generateFDPAttendedReport = async (req, res) => {
  try {
    const fdp = await FDPAttended.findById(req.params.id);
    if (!fdp) return res.status(404).json({ message: "Not found" });

    const filePath = path.join("reports", `fdp_attended_${fdp._id}.pdf`);
    generatePDF(fdp, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
