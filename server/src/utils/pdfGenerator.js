


//server/src/utils/pdfGenerator.js

import PDFDocument from "pdfkit";

export const generatePDF = async (activity) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        let pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header
      doc.fontSize(18).text("DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING", { align: "center" });
      doc.moveDown();
      doc.fontSize(14).text(`ACTIVITY REPORT: ${activity.title || "Untitled"}`, { align: "center" });
      doc.moveDown();

      // Summary
      if (activity.summary) {
        doc.fontSize(14).text("Summary", { underline: true });
        doc.fontSize(12).text(activity.summary);
        doc.moveDown();
      }

      // Table of Contents
      if (activity.toc) {
        doc.fontSize(14).text("Table of Contents", { underline: true });
        doc.fontSize(12).text(activity.toc);
        doc.moveDown();
      }

      // Brochure
      if (activity.brochure) {
        doc.fontSize(14).text("Brochure", { underline: true });
        doc.fontSize(12).text(activity.brochure);
        doc.moveDown();
      }

      // Resource Persons
      if (activity.resourcePersons?.length > 0) {
        doc.fontSize(14).text("Resource Persons", { underline: true });
        activity.resourcePersons.forEach((rp, i) => {
          doc.fontSize(12).text(`${i + 1}. ${rp.name || "N/A"} - ${rp.details || ""}`);
        });
        doc.moveDown();
      }

      // Attendance file reference
      if (activity.attendanceFile) {
        doc.fontSize(14).text("Attendance", { underline: true });
        doc.fontSize(12).text(`Attendance file: ${activity.attendanceFile}`);
        doc.moveDown();
      }

      // Feedback
      if (activity.feedback) {
        doc.fontSize(14).text("Feedback", { underline: true });
        if (typeof activity.feedback === "string") {
          doc.fontSize(12).text(activity.feedback);
        } else {
          doc.fontSize(12).text(JSON.stringify(activity.feedback, null, 2));
        }
        doc.moveDown();
      }

      // Geo-tagged photos reference
      if (activity.geoTagPhotos?.length > 0) {
        doc.fontSize(14).text("Geo-tagged Photos", { underline: true });
        activity.geoTagPhotos.forEach((photo, i) => {
          doc.fontSize(12).text(`${i + 1}. ${photo}`);
        });
        doc.moveDown();
      }

      // Created By
      if (activity.createdBy) {
        doc.fontSize(12).text(`Created By: ${activity.createdBy}`, { align: "right" });
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
