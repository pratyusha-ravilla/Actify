import FDPConducted from "../models/FDPConducted.js";
import { generatePDF } from "../utils/pdfUtils.js";
import path from "path";

export const createFDPConducted = async (req, res) => {
  try {
    const fdp = new FDPConducted(req.body);
    await fdp.save();
    res.status(201).json(fdp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFDPConducted = async (req, res) => {
  try {
    const data = await FDPConducted.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const generateFDPConductedReport = async (req, res) => {
  try {
    const fdp = await FDPConducted.findById(req.params.id);
    if (!fdp) return res.status(404).json({ message: "Not found" });

    const filePath = path.join("reports", `fdp_conducted_${fdp._id}.pdf`);
    generatePDF(fdp, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
