import express from "express";
import { generatePDF } from "../utils/pdfUtils.js";

const router = express.Router();

router.get("/sample-pdf", async (req, res) => {
  try {
    // Dummy activity data (similar to your FDP model fields)
    const sampleActivity = {
      title: "Expert Talk on Human Values & Rationality",
      summary: "A detailed session on balancing science, technology, and ethics.",
      toc: "1. Invitation\n2. Poster\n3. Session Report\n4. Attendance\n5. Feedback",
      brochure: "Download link: brochure.pdf",
      resourcePersons: [
        { name: "Prof. Sharath Anantha Murthy", details: "VC, Kuvempu University" }
      ],
      geoTagPhotos: ["photo1.jpg", "photo2.jpg"],
      attendanceFile: "attendance_list.xlsx",
      feedback: { rating: "4.5/5", comments: "Excellent session" },
      createdBy: "faculty"
    };

    // Generate PDF buffer
    const pdfBuffer = await generatePDF(sampleActivity);

    // Send PDF to browser
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="sample_activity.pdf"`
    );
    res.send(pdfBuffer);
  } catch (err) {
    console.error("Error generating PDF:", err);
    res.status(500).json({ message: "Error generating sample PDF" });
  }
});

export default router;
