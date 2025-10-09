//server/src/controllers/templateController.js

import FDPAttended from "../models/FDPAttended.js";

// Save FDP template to MongoDB
export const saveTemplate = async (req, res) => {
  try {
    const data = req.body;

    // Create a new FDPAttended document
    const fdp = new FDPAttended({
      title: data.title || "",
      summary: data.summary || "",
      toc: data.toc || "",
      brochure: data.brochure || "",
      resourcePersons: data.resourcePersons || [],
      geoTagPhotos: data.geoTagPhotos || [],
      attendanceFile: data.attendanceFile || "",
      feedback: data.feedback || {},
      createdBy: data.createdBy || "faculty",
    });

    await fdp.save();

    res.status(201).json({ message: "Template saved successfully", fdp });
  } catch (err) {
    console.error("Error saving template:", err);
    res.status(500).json({ message: "Failed to save template", error: err.message });
  }
};
