// import FDPConducted from "../models/FDPConducted.js";
// import { generatePDF } from "../utils/pdfUtils.js";
// import path from "path";

// export const createFDPConducted = async (req, res) => {
//   try {
//     const fdp = new FDPConducted(req.body);
//     await fdp.save();
//     res.status(201).json(fdp);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getFDPConducted = async (req, res) => {
//   try {
//     const data = await FDPConducted.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const generateFDPConductedReport = async (req, res) => {
//   try {
//     const fdp = await FDPConducted.findById(req.params.id);
//     if (!fdp) return res.status(404).json({ message: "Not found" });

//     const filePath = path.join("reports", `fdp_conducted_${fdp._id}.pdf`);
//     generatePDF(fdp, filePath);

//     res.download(filePath);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




import FDPConducted from "../models/FDPConducted.js";
import { generatePDF } from "../utils/pdfUtils.js";
import path from "path";

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

// 📝 Generate FDP Conducted PDF Report
export const generateFDPConductedReport = async (req, res) => {
  try {
    const fdp = await FDPConducted.findById(req.params.id);
    if (!fdp) return res.status(404).json({ message: "Not found" });

    const filePath = path.join("reports", `fdp_conducted_${fdp._id}.pdf`);
    await generatePDF(fdp, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
