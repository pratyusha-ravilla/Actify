
// // server/src/utils/templateUtils.js

// import PDFDocument from "pdfkit";
// import fs from "fs";
// import { Document, Packer, Paragraph, HeadingLevel } from "docx";

// // ---------------------------- FDP Attended PDF ----------------------------
// export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(pdfPath);
//       doc.pipe(stream);

//       // Page 1 - Summary
//       doc.fontSize(20).fillColor("#4B0082").text("ACTIVITY ATTENDED REPORT", { align: "center", underline: true });
//       doc.moveDown(2);
//       doc.fontSize(12).fillColor("black");
//       doc.text(`Activity Name: ${fdp.activityName || "N/A"}`);
//       doc.text(`Co-ordinator: ${fdp.coordinator || "N/A"}`);
//       doc.text(`Date: ${fdp.date || "N/A"}`);
//       doc.text(`Duration: ${fdp.duration || "N/A"}`);
//       doc.text(`PO & POs: ${fdp.pos || "N/A"}`);
//       doc.addPage();

//       // Table of Contents
//       doc.fontSize(18).fillColor("#4B0082").text("TABLE OF CONTENTS", { align: "center", underline: true });
//       doc.moveDown();
//       const contents = [
//         "1. INVITATION",
//         "2. POSTER",
//         "3. RESOURCE PERSON DETAILS",
//         "4. SESSION REPORT",
//         "5. ATTENDANCE",
//         "6. PHOTOS",
//         "7. FEEDBACK",
//       ];
//       doc.fontSize(12).fillColor("black");
//       contents.forEach((item) => doc.text(item));
//       doc.addPage();

//       // Resource Persons
//       doc.fontSize(16).fillColor("#4B0082").text("RESOURCE PERSON DETAILS", { underline: true });
//       doc.moveDown();
//       fdp.resourcePersons?.length
//         ? fdp.resourcePersons.forEach((rp, i) =>
//             doc.text(`${i + 1}. ${rp.name} — ${rp.designation} (${rp.institution})`)
//           )
//         : doc.text("No Resource Persons listed.");
//       doc.addPage();

//       // Session Report
//       doc.fontSize(16).fillColor("#4B0082").text("SESSION REPORT", { underline: true });
//       doc.moveDown();
//       doc.fontSize(12).fillColor("black").text(fdp.summary || "No session summary available.");
//       doc.addPage();

//       // Attendance
//       doc.fontSize(16).fillColor("#4B0082").text("ATTENDANCE", { underline: true });
//       doc.moveDown();
//       if (fdp.attendanceFile) doc.text(`Attendance File: ${fdp.attendanceFile}`);
//       else doc.text("No attendance file uploaded.");
//       doc.addPage();

//       // Photos
//       doc.fontSize(16).fillColor("#4B0082").text("PHOTOS", { underline: true });
//       doc.moveDown();
//       fdp.geoTagPhotos?.length
//         ? fdp.geoTagPhotos.forEach((p, i) => doc.text(`${i + 1}. ${p}`))
//         : doc.text("No photos available.");
//       doc.addPage();

//       // Feedback
//       doc.fontSize(16).fillColor("#4B0082").text("FEEDBACK", { underline: true });
//       doc.moveDown();
//       doc.text(typeof fdp.feedback === "object" ? JSON.stringify(fdp.feedback, null, 2) : fdp.feedback || "No feedback.");

//       doc.end();
//       stream.on("finish", resolve);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// // ---------------------------- FDP Attended Word ----------------------------
// export const generateFDPAttendedWord = async (fdp, wordPath) => {
//   try {
//     const sections = [
//       {
//         children: [
//           new Paragraph({ text: "ACTIVITY ATTENDED REPORT", heading: HeadingLevel.HEADING_1 }),
//           new Paragraph(""),
//           new Paragraph(`Activity Name: ${fdp.activityName || "N/A"}`),
//           new Paragraph(`Co-ordinator: ${fdp.coordinator || "N/A"}`),
//           new Paragraph(`Date: ${fdp.date || "N/A"}`),
//           new Paragraph(`Duration: ${fdp.duration || "N/A"}`),
//           new Paragraph(`PO & POs: ${fdp.pos || "N/A"}`),
//         ],
//       },
//     ];

//     const doc = new Document({ sections });
//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync(wordPath, buffer);
//   } catch (err) {
//     console.error("❌ Error generating Word:", err);
//     throw err;
//   }
// };

// // ---------------------------- FDP Conducted PDF ----------------------------
// export const generateFDPConductedPDF = async (fdp, pdfPath) => {
//   return generateFDPAttendedPDF(fdp, pdfPath);
// };

// // ---------------------------- FDP Conducted Word ----------------------------
// export const generateFDPConductedWord = async (fdp, wordPath) => {
//   return generateFDPAttendedWord(fdp, wordPath);
// };

// // ---------------------------- Expert Talk PDF ----------------------------
// export const generateExpertTalkPDF = async (expertTalk, pdfPath) => {
//   // For now, reuse the same structure — can be customized later
//   return generateFDPAttendedPDF(expertTalk, pdfPath);
// };

// // ---------------------------- Expert Talk Word ----------------------------
// export const generateExpertTalkWord = async (expertTalk, wordPath) => {
//   // Reuse same structure for now
//   return generateFDPAttendedWord(expertTalk, wordPath);
// };





import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

// ---------------------------- Helper: Footer with page numbers ----------------------------
const addFooter = (doc) => {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);
    const pageNumber = `${i + 1} | Page`;
    doc.fontSize(9).fillColor("gray").text(pageNumber, 520, 810, { align: "right" });
  }
};

// ---------------------------- Helper: Common Header ----------------------------
const drawHeader = (doc) => {
  const leftLogo = path.resolve("server/src/images/atria-logo.png");
  const rightLogo = path.resolve("server/src/images/atria-25years.png");

  // Left Logo
  if (fs.existsSync(leftLogo)) {
    doc.image(leftLogo, 50, 25, { width: 100 });
  }

  // Right Logo
  if (fs.existsSync(rightLogo)) {
    doc.image(rightLogo, 450, 25, { width: 100 });
  }

  // Centered Header Text
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#8B0000")
    .text("Department of Computer Science & Engineering", 0, 45, {
      align: "center",
    });

  doc
    .font("Helvetica-BoldOblique")
    .fontSize(11)
    .fillColor("#4B0082")
    .text("Program: Computer Science & Design", { align: "center" });

  doc.moveDown(3);
};

// ---------------------------- FDP Attended PDF ----------------------------
export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 90, bottom: 60, left: 50, right: 50 },
        bufferPages: true,
      });

      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      // Header
      drawHeader(doc);

      // ---------------------------- Page 1 - Summary ----------------------------
      doc
        .fontSize(16)
        .fillColor("#4B0082")
        .font("Helvetica-Bold")
        .text("ACTIVITY ATTENDED REPORT", { align: "center", underline: true });
      doc.moveDown(2);

      doc.fontSize(12).fillColor("black").font("Helvetica");
      doc.text(`Activity Name: ${fdp.activityName || "N/A"}`);
      doc.text(`Co-ordinator: ${fdp.coordinator || "N/A"}`);
      doc.text(`Date: ${fdp.date || "N/A"}`);
      doc.text(`Duration: ${fdp.duration || "N/A"}`);
      doc.text(`PO & POs: ${fdp.pos || "N/A"}`);

      doc.moveDown(2);
      doc
        .fontSize(10)
        .fillColor("gray")
        .text(
          "ATRIA INSTITUTE OF TECHNOLOGY, Adjacent Bangalore Baptist Hospital, Hebbal, Bengaluru - 560 024",
          { align: "center" }
        );

      doc.addPage();
      drawHeader(doc);

      // ---------------------------- Table of Contents ----------------------------
      doc
        .fontSize(16)
        .fillColor("#4B0082")
        .font("Helvetica-Bold")
        .text("TABLE OF CONTENTS", { align: "center", underline: true });
      doc.moveDown(1);

      const contents = [
        "1. INVITATION",
        "2. POSTER",
        "3. RESOURCE PERSON DETAILS",
        "4. SESSION REPORT",
        "5. ATTENDANCE",
        "6. PHOTOS",
        "7. FEEDBACK",
      ];

      doc.fontSize(12).fillColor("black").font("Helvetica");
      contents.forEach((item) => doc.text(item));

      doc.addPage();
      drawHeader(doc);

      // ---------------------------- Resource Persons ----------------------------
      doc
        .fontSize(16)
        .fillColor("#4B0082")
        .font("Helvetica-Bold")
        .text("RESOURCE PERSON DETAILS", { underline: true });
      doc.moveDown(1);

      if (fdp.resourcePersons?.length) {
        fdp.resourcePersons.forEach((rp, i) => {
          doc.fontSize(12).fillColor("black").text(`${i + 1}. ${rp.name} — ${rp.designation} (${rp.institution})`);
        });
      } else {
        doc.text("No Resource Persons listed.");
      }

      doc.addPage();
      drawHeader(doc);

      // ---------------------------- Session Report ----------------------------
      doc
        .fontSize(16)
        .fillColor("#4B0082")
        .font("Helvetica-Bold")
        .text("SESSION REPORT", { underline: true });
      doc.moveDown(1);

      doc.fontSize(12).fillColor("black").text(fdp.summary || "No session summary available.", {
        align: "justify",
      });

      doc.addPage();
      drawHeader(doc);

      // ---------------------------- Attendance ----------------------------
      doc
        .fontSize(16)
        .fillColor("#4B0082")
        .font("Helvetica-Bold")
        .text("ATTENDANCE", { underline: true });
      doc.moveDown(1);

      if (fdp.attendanceFile) {
        doc.text(`Attendance File: ${fdp.attendanceFile}`);
      } else {
        doc.text("No attendance file uploaded.");
      }

      doc.addPage();
      drawHeader(doc);

      // ---------------------------- Photos ----------------------------
      doc
        .fontSize(16)
        .fillColor("#4B0082")
        .font("Helvetica-Bold")
        .text("PHOTOS", { underline: true });
      doc.moveDown(1);

      if (fdp.geoTagPhotos?.length) {
        fdp.geoTagPhotos.forEach((p, i) => {
          doc.text(`${i + 1}. ${p}`);
        });
      } else {
        doc.text("No photos available.");
      }

      doc.addPage();
      drawHeader(doc);

      // ---------------------------- Feedback ----------------------------
      doc
        .fontSize(16)
        .fillColor("#4B0082")
        .font("Helvetica-Bold")
        .text("FEEDBACK", { underline: true });
      doc.moveDown(1);

      doc
        .fontSize(12)
        .fillColor("black")
        .text(
          typeof fdp.feedback === "object"
            ? JSON.stringify(fdp.feedback, null, 2)
            : fdp.feedback || "No feedback.",
          { align: "justify" }
        );

      // ---------------------------- Footer with Page Numbers ----------------------------
      doc.end();
      stream.on("finish", () => {
        addFooter(doc);
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
};

// ---------------------------- FDP Attended Word ----------------------------
export const generateFDPAttendedWord = async (fdp, wordPath) => {
  try {
    const sections = [
      {
        children: [
          new Paragraph({ text: "ACTIVITY ATTENDED REPORT", heading: HeadingLevel.HEADING_1 }),
          new Paragraph(""),
          new Paragraph(`Activity Name: ${fdp.activityName || "N/A"}`),
          new Paragraph(`Co-ordinator: ${fdp.coordinator || "N/A"}`),
          new Paragraph(`Date: ${fdp.date || "N/A"}`),
          new Paragraph(`Duration: ${fdp.duration || "N/A"}`),
          new Paragraph(`PO & POs: ${fdp.pos || "N/A"}`),
        ],
      },
    ];

    const doc = new Document({ sections });
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(wordPath, buffer);
  } catch (err) {
    console.error("❌ Error generating Word:", err);
    throw err;
  }
};

// ---------------------------- FDP Conducted / Expert Talk ----------------------------
export const generateFDPConductedPDF = async (fdp, pdfPath) => generateFDPAttendedPDF(fdp, pdfPath);
export const generateFDPConductedWord = async (fdp, wordPath) => generateFDPAttendedWord(fdp, wordPath);
export const generateExpertTalkPDF = async (talk, pdfPath) => generateFDPAttendedPDF(talk, pdfPath);
export const generateExpertTalkWord = async (talk, wordPath) => generateFDPAttendedWord(talk, wordPath);
