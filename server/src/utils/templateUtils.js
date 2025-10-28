
// server/src/utils/templateUtils.js

// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Document, Packer, Paragraph, HeadingLevel } from "docx";

// // ---------------------------- Helper: Footer with page numbers ----------------------------
// const addFooter = (doc) => {
//   const range = doc.bufferedPageRange();
//   for (let i = 0; i < range.count; i++) {
//     doc.switchToPage(i);
//     const pageNumber = `Page ${i + 1}`;
//     doc.fontSize(9).fillColor("gray").text(pageNumber, 520, 810, { align: "right" });
//   }
// };

// // ---------------------------- Helper: Common Header ----------------------------
// const drawHeader = (doc) => {
//   const leftLogo = path.resolve("server/src/images/atria-logo.png");
//   const rightLogo = path.resolve("server/src/images/atria-25years.png");

//   // Left Logo
//   if (fs.existsSync(leftLogo)) {
//     doc.image(leftLogo, 50, 25, { width: 100 });
//   }

//   // Right Logo
//   if (fs.existsSync(rightLogo)) {
//     doc.image(rightLogo, 450, 25, { width: 100 });
//   }

//   // Center Header Text
//   doc
//     .font("Helvetica-Bold")
//     .fontSize(13)
//     .fillColor("#8B0000")
//     .text("Atria Institute of Technology", 0, 35, { align: "center" });

//   doc
//     .font("Helvetica-Bold")
//     .fontSize(11)
//     .fillColor("#4B0082")
//     .text("Department of Computer Science & Engineering", { align: "center" });

//   doc
//     .font("Helvetica-Oblique")
//     .fontSize(10)
//     .fillColor("gray")
//     .text("Program: Computer Science & Design", { align: "center" });

//   doc.moveDown(2);
// };

// // ---------------------------- FDP Attended PDF ----------------------------
// export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({
//         size: "A4",
//         margins: { top: 90, bottom: 60, left: 50, right: 50 },
//         bufferPages: true,
//       });

//       const stream = fs.createWriteStream(pdfPath);
//       doc.pipe(stream);

//       // Page 1 - Summary
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("ACTIVITY ATTENDED REPORT", { align: "center", underline: true });
//       doc.moveDown(2);

//       doc.fontSize(12).fillColor("black").font("Helvetica");
//       doc.text(`Activity Name: ${fdp.activityName || "N/A"}`);
//       doc.text(`Co-ordinator: ${fdp.coordinator || "N/A"}`);
//       doc.text(`Date: ${fdp.date || "N/A"}`);
//       doc.text(`Duration: ${fdp.duration || "N/A"}`);
//       doc.text(`PO & POs: ${fdp.pos || "N/A"}`);

//       doc.moveDown(2);
//       doc
//         .fontSize(10)
//         .fillColor("gray")
//         .text(
//           "ATRIA INSTITUTE OF TECHNOLOGY, Adjacent Bangalore Baptist Hospital, Hebbal, Bengaluru - 560 024",
//           { align: "center" }
//         );

//       // Table of Contents
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("TABLE OF CONTENTS", { align: "center", underline: true });
//       doc.moveDown(1);

//       const contents = [
//         "1. INVITATION",
//         "2. POSTER / BROCHURE",
//         "3. RESOURCE PERSON DETAILS",
//         "4. SESSION REPORT",
//         "5. ATTENDANCE",
//         "6. PHOTOS",
//         "7. FEEDBACK",
//       ];

//       doc.fontSize(12).fillColor("black").font("Helvetica");
//       contents.forEach((item) => doc.text(item));

//       // ---------------------------- BROCHURE / POSTER ----------------------------
//       if (fdp.brochure?.length) {
//         fdp.brochure.forEach((file, index) => {
//           doc.addPage();
//           drawHeader(doc);

//           doc
//             .fontSize(16)
//             .fillColor("#4B0082")
//             .font("Helvetica-Bold")
//             .text(`POSTER / BROCHURE ${index + 1}`, { align: "center", underline: true });
//           doc.moveDown(1);

//           const filePath = path.resolve(`server/uploads/${file}`);
//           if (fs.existsSync(filePath)) {
//             doc.image(filePath, 90, 130, { width: 432, height: 585 }); // 15.24 x 20.63 cm
//           } else {
//             doc.text("Poster not found on server.");
//           }
//         });
//       }

//       // ---------------------------- RESOURCE PERSON DETAILS ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("RESOURCE PERSON DETAILS", { align: "center", underline: true });
//       doc.moveDown(1);

//       if (fdp.resourcePersons?.length) {
//         fdp.resourcePersons.forEach((rp, i) => {
//           doc
//             .fontSize(12)
//             .fillColor("black")
//             .text(`${i + 1}. ${rp.name} — ${rp.designation} (${rp.institution})`, { continued: false });
//           doc.text(`Email: ${rp.email || "N/A"} | Phone: ${rp.phone || "N/A"}`);

//           const imgPath = rp.image ? path.resolve(`server/uploads/${rp.image}`) : null;
//           if (imgPath && fs.existsSync(imgPath)) {
//             doc.image(imgPath, 160, doc.y + 10, { width: 240, height: 260 });
//             doc.moveDown(15);
//           }

//           if (rp.otherInformation) {
//             doc.fontSize(11).fillColor("gray").text(`Other Info: ${rp.otherInformation}`);
//           }

//           doc.moveDown(2);
//         });
//       } else {
//         doc.text("No Resource Persons listed.");
//       }

//       // ---------------------------- SESSION REPORT ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("SESSION REPORT", { align: "center", underline: true });
//       doc.moveDown(1);

//       doc.fontSize(12).fillColor("black").text(fdp.summary || "No session summary available.", {
//         align: "justify",
//       });

//       // ---------------------------- ATTENDANCE ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("ATTENDANCE", { align: "center", underline: true });
//       doc.moveDown(1);

//       if (fdp.attendanceFile) {
//         doc.text(`Attendance File: ${fdp.attendanceFile}`);
//       } else {
//         doc.text("No attendance file uploaded.");
//       }

//       // ---------------------------- PHOTOS ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("PHOTOS", { align: "center", underline: true });
//       doc.moveDown(1);

//       if (fdp.geoTagPhotos?.length) {
//         fdp.geoTagPhotos.forEach((p, i) => {
//           const photoPath = path.resolve(`server/uploads/${p}`);
//           if (fs.existsSync(photoPath)) {
//             doc.image(photoPath, { width: 400, align: "center" });
//             doc.moveDown(1);
//           } else {
//             doc.text(`${i + 1}. ${p}`);
//           }
//         });
//       } else {
//         doc.text("No photos available.");
//       }

//       // ---------------------------- FEEDBACK ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("FEEDBACK", { align: "center", underline: true });
//       doc.moveDown(1);

//       doc
//         .fontSize(12)
//         .fillColor("black")
//         .text(
//           typeof fdp.feedback === "object"
//             ? JSON.stringify(fdp.feedback, null, 2)
//             : fdp.feedback || "No feedback.",
//           { align: "justify" }
//         );

//       // Footer + End PDF
//       doc.end();
//       stream.on("finish", () => {
//         addFooter(doc);
//         resolve();
//       });
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

// // ---------------------------- FDP Conducted / Expert Talk ----------------------------
// export const generateFDPConductedPDF = async (fdp, pdfPath) => generateFDPAttendedPDF(fdp, pdfPath);
// export const generateFDPConductedWord = async (fdp, wordPath) => generateFDPAttendedWord(fdp, wordPath);
// export const generateExpertTalkPDF = async (talk, pdfPath) => generateFDPAttendedPDF(talk, pdfPath);
// export const generateExpertTalkWord = async (talk, wordPath) => generateFDPAttendedWord(talk, wordPath);






// import PDFDocument from "pdfkit";
// import fs from "fs";
// import path from "path";
// import { Document, Packer, Paragraph, HeadingLevel } from "docx";

// // ---------------------------- Helper: Footer with page numbers ----------------------------
// const addFooter = (doc) => {
//   const range = doc.bufferedPageRange();
//   for (let i = 0; i < range.count; i++) {
//     doc.switchToPage(i);
//     doc
//       .fontSize(9)
//       .fillColor("gray")
//       .text(`Page ${i + 1}`, 520, 810, { align: "right" });
//   }
// };

// // ---------------------------- Helper: Common Header ----------------------------
// const drawHeader = (doc) => {
//   const leftLogo = path.resolve("server/src/images/atria-logo.png");
//   const rightLogo = path.resolve("server/src/images/atria-25years.png");

//   if (fs.existsSync(leftLogo)) doc.image(leftLogo, 50, 25, { width: 100 });
//   if (fs.existsSync(rightLogo)) doc.image(rightLogo, 445, 25, { width: 100 });

//   doc
//     .font("Helvetica-Bold")
//     .fontSize(16)
//     .fillColor("#a52a2a")
//     .text("Department of Computer Science & Engineering", 0, 40, {
//       align: "center",
//     });

//   doc
//     .font("Helvetica-BoldOblique")
//     .fontSize(12)
//     .fillColor("#4b0082")
//     .text("Program: Computer Science & Design", { align: "center" });

//   doc.moveDown(3);
// };

// // ---------------------------- FDP Attended PDF ----------------------------
// export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({
//         size: "A4",
//         margins: { top: 100, bottom: 70, left: 50, right: 50 },
//         bufferPages: true,
//       });

//       const stream = fs.createWriteStream(pdfPath);
//       doc.pipe(stream);

//       // ---------------------------- PAGE 1: Summary ----------------------------
//       drawHeader(doc);

//       // Title
//       doc
//         .moveDown(1.5)
//         .font("Helvetica-Bold")
//         .fontSize(18)
//         .fillColor("#4B0082")
//         .text("ACTIVITY ATTENDED REPORT", { align: "center", underline: true })
//         .moveDown(2);

//       // Activity Information Table (styled box)
//       const tableX = 80;
//       const tableY = doc.y;
//       const lineHeight = 24;

//       const rows = [
//         ["Activity Name", fdp.activityName || "N/A"],
//         ["Coordinator", fdp.coordinator || "N/A"],
//         ["Date", fdp.date || "N/A"],
//         ["Duration", fdp.duration || "N/A"],
//         ["PO & POs", fdp.pos || "N/A"],
//       ];

//       const cellWidthLabel = 150;
//       const cellWidthValue = 280;

//       doc.fontSize(12).font("Helvetica");

//       rows.forEach(([label, value], i) => {
//         const y = tableY + i * lineHeight;
//         doc
//           .rect(tableX, y, cellWidthLabel + cellWidthValue, lineHeight)
//           .fillAndStroke("#ead3d3", "#c0a0a0");
//         doc
//           .fillColor("black")
//           .text(label + ":", tableX + 8, y + 6, { width: cellWidthLabel });
//         doc.text(value, tableX + cellWidthLabel + 10, y + 6, {
//           width: cellWidthValue,
//         });
//       });

//       doc.moveDown(6);

//       // Footer (centered)
//       doc
//         .fontSize(12)
//         .fillColor("#4B0082")
//         .font("Helvetica-Bold")
//         .text("ACADEMIC YEAR 2024–25", { align: "center" })
//         .moveDown(0.5)
//         .font("Helvetica-Bold")
//         .fontSize(10)
//         .fillColor("#a52a2a")
//         .text(
//           "ATRIA INSTITUTE OF TECHNOLOGY,\nAdjacent Bangalore Baptist Hospital, Hebbal,\nBengaluru - 560 024",
//           { align: "center" }
//         );

//       // ---------------------------- PAGE 2: Table of Contents ----------------------------
//       doc.addPage();
//       drawHeader(doc);

//       doc
//         .font("Helvetica-Bold")
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .text("TABLE OF CONTENTS", { align: "center", underline: true })
//         .moveDown(1.5);

//       const contents = [
//         "1. INVITATION / POSTER",
//         "2. RESOURCE PERSON DETAILS",
//         "3. SESSION REPORT",
//         "4. ATTENDANCE",
//         "5. PHOTOS",
//         "6. FEEDBACK",
//       ];

//       doc.font("Helvetica").fontSize(12).fillColor("black");
//       contents.forEach((item) => doc.text(item, { lineGap: 4 }));

//       // ---------------------------- Poster Section ----------------------------
//       if (fdp.brochure?.length) {
//         fdp.brochure.forEach((poster, idx) => {
//           doc.addPage();
//           drawHeader(doc);
//           doc
//             .fontSize(16)
//             .font("Helvetica-Bold")
//             .fillColor("#4B0082")
//             .text(`POSTER ${idx + 1}`, { align: "center", underline: true })
//             .moveDown(1.5);

//           const posterPath = path.resolve("server/uploads/", poster);
//           if (fs.existsSync(posterPath)) {
//             doc.image(posterPath, {
//               fit: [432, 600],
//               align: "center",
//               valign: "center",
//             });
//           } else {
//             doc
//               .fontSize(12)
//               .fillColor("gray")
//               .text("Poster image not found or invalid file type.", {
//                 align: "center",
//               });
//           }
//         });
//       }

//       // ---------------------------- Resource Persons ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .fontSize(16)
//         .font("Helvetica-Bold")
//         .fillColor("#4B0082")
//         .text("RESOURCE PERSON DETAILS", { align: "center", underline: true })
//         .moveDown(1.5);

//       if (fdp.resourcePersons?.length) {
//         fdp.resourcePersons.forEach((rp, i) => {
//           doc
//             .font("Helvetica-Bold")
//             .fontSize(12)
//             .fillColor("black")
//             .text(`${i + 1}. ${rp.name}`)
//             .font("Helvetica")
//             .text(`Designation: ${rp.designation || "N/A"}`)
//             .text(`Institution: ${rp.institution || "N/A"}`)
//             .text(`Email: ${rp.email || "N/A"}`)
//             .text(`Phone: ${rp.phone || "N/A"}`)
//             .text(`Other Info: ${rp.otherInformation || "N/A"}`);

//           if (rp.image && fs.existsSync(path.resolve("server/uploads/", rp.image))) {
//             doc.moveDown(0.5);
//             doc.image(path.resolve("server/uploads/", rp.image), {
//               width: 240,
//               align: "center",
//             });
//           } else {
//             doc.moveDown(0.5);
//             doc
//               .fontSize(10)
//               .fillColor("gray")
//               .text("(Resource person photo not found)", { align: "center" });
//           }
//           doc.moveDown(1.5);
//         });
//       } else {
//         doc.text("No Resource Persons listed.", { align: "center" });
//       }

//       // ---------------------------- SESSION REPORT ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .font("Helvetica-Bold")
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .text("SESSION REPORT", { align: "center", underline: true })
//         .moveDown(1.5)
//         .font("Helvetica")
//         .fontSize(12)
//         .fillColor("black")
//         .text(fdp.summary || "No session summary available.", { align: "justify" });

//       // ---------------------------- ATTENDANCE ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .font("Helvetica-Bold")
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .text("ATTENDANCE", { align: "center", underline: true })
//         .moveDown(1.5)
//         .font("Helvetica")
//         .fontSize(12)
//         .fillColor("black");

//       doc.text(
//         fdp.attendanceFile
//           ? `Attendance File: ${fdp.attendanceFile}`
//           : "No attendance file uploaded.",
//         { align: "left" }
//       );

//       // ---------------------------- PHOTOS ----------------------------
//       if (fdp.geoTagPhotos?.length) {
//         fdp.geoTagPhotos.forEach((photo, i) => {
//           doc.addPage();
//           drawHeader(doc);
//           doc
//             .font("Helvetica-Bold")
//             .fontSize(16)
//             .fillColor("#4B0082")
//             .text(`PHOTO ${i + 1}`, { align: "center", underline: true })
//             .moveDown(1.5);

//           const photoPath = path.resolve("server/uploads/", photo);
//           if (fs.existsSync(photoPath)) {
//             doc.image(photoPath, {
//               fit: [420, 550],
//               align: "center",
//               valign: "center",
//             });
//           } else {
//             doc
//               .fontSize(12)
//               .fillColor("gray")
//               .text("Photo not found or invalid file.", { align: "center" });
//           }
//         });
//       }

//       // ---------------------------- FEEDBACK ----------------------------
//       doc.addPage();
//       drawHeader(doc);
//       doc
//         .font("Helvetica-Bold")
//         .fontSize(16)
//         .fillColor("#4B0082")
//         .text("FEEDBACK", { align: "center", underline: true })
//         .moveDown(1.5)
//         .font("Helvetica")
//         .fontSize(12)
//         .fillColor("black")
//         .text(
//           typeof fdp.feedback === "object"
//             ? JSON.stringify(fdp.feedback, null, 2)
//             : fdp.feedback || "No feedback provided.",
//           { align: "justify" }
//         );

//       doc.end();
//       stream.on("finish", () => resolve());
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
//           new Paragraph({
//             text: "ACTIVITY ATTENDED REPORT",
//             heading: HeadingLevel.HEADING_1,
//           }),
//           new Paragraph(""),
//           new Paragraph(`Activity Name: ${fdp.activityName || "N/A"}`),
//           new Paragraph(`Coordinator: ${fdp.coordinator || "N/A"}`),
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
// // ---------------------------- FDP Conducted / Expert Talk (Reused templates) ----------------------------
// export const generateFDPConductedPDF = async (fdp, pdfPath) =>
//   generateFDPAttendedPDF(fdp, pdfPath);

// export const generateFDPConductedWord = async (fdp, wordPath) =>
//   generateFDPAttendedWord(fdp, wordPath);

// export const generateExpertTalkPDF = async (talk, pdfPath) =>
//   generateFDPAttendedPDF(talk, pdfPath);

// export const generateExpertTalkWord = async (talk, wordPath) =>
//   generateFDPAttendedWord(talk, wordPath);





import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

// ---------------------------- Helper: Footer with page numbers ----------------------------
const addFooter = (doc) => {
  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(i);
    doc
      .fontSize(9)
      .fillColor("gray")
      .text(`Page ${i + 1} | Academic Year 2024–25`, 0, 820, { align: "center" });
  }
};

// ---------------------------- Helper: Common Header ----------------------------
const drawHeader = (doc) => {
  const leftLogo = path.resolve("server/src/images/atria-logo.png");
  const rightLogo = path.resolve("server/src/images/atria-25years.png");

  if (fs.existsSync(leftLogo)) doc.image(leftLogo, 45, 25, { width: 90 });
  if (fs.existsSync(rightLogo)) doc.image(rightLogo, 445, 25, { width: 90 });

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor("#a52a2a")
    .text("Atria Institute of Technology", 0, 30, { align: "center" });

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#a52a2a")
    .text("Department of Computer Science & Engineering", { align: "center" });

  doc
    .font("Helvetica-BoldOblique")
    .fontSize(12)
    .fillColor("#4B0082")
    .text("Program: Computer Science & Design", { align: "center" });

  doc.moveDown(2);
};

// ---------------------------- FDP Attended PDF ----------------------------
export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 100, bottom: 70, left: 50, right: 50 },
        bufferPages: true,
      });

      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      // ---------------------------- PAGE 1: SUMMARY ----------------------------
      drawHeader(doc);

      doc
        .moveDown(1.5)
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor("#4B0082")
        .text("ACTIVITY ATTENDED REPORT", { align: "center", underline: true })
        .moveDown(2);

      const tableX = 80;
      const tableY = doc.y;
      const lineHeight = 26;

      const rows = [
        ["Activity Name", fdp.activityName || "N/A"],
        ["Coordinator", fdp.coordinator || "N/A"],
        ["Date", fdp.date || "N/A"],
        ["Duration", fdp.duration || "N/A"],
        ["PO & POs", fdp.pos || "N/A"],
      ];

      const cellWidthLabel = 150;
      const cellWidthValue = 280;

      rows.forEach(([label, value], i) => {
        const y = tableY + i * lineHeight;
        doc
          .rect(tableX, y, cellWidthLabel + cellWidthValue, lineHeight)
          .fillAndStroke("#f0dada", "#c19a9a");
        doc
          .fillColor("black")
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(label + ":", tableX + 8, y + 7, { width: cellWidthLabel });
        doc
          .font("Helvetica")
          .text(value, tableX + cellWidthLabel + 10, y + 7, {
            width: cellWidthValue,
          });
      });

      doc.moveDown(6);

      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .fillColor("#4B0082")
        .text("ACADEMIC YEAR 2024–25", { align: "center" })
        .moveDown(0.5)
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#a52a2a")
        .text(
          "ATRIA INSTITUTE OF TECHNOLOGY,\nAdjacent Bangalore Baptist Hospital, Hebbal,\nBengaluru - 560 024",
          { align: "center" }
        );

      // ---------------------------- PAGE 2: TABLE OF CONTENTS ----------------------------
      doc.addPage();
      drawHeader(doc);

      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#4B0082")
        .text("TABLE OF CONTENTS", { align: "center", underline: true })
        .moveDown(1.5);

      const contents = [
        "1. INVITATION / POSTER",
        "2. RESOURCE PERSON DETAILS",
        "3. SESSION REPORT",
        "4. ATTENDANCE",
        "5. PHOTOS",
        "6. FEEDBACK",
      ];
      doc.font("Helvetica").fontSize(12).fillColor("black");
      contents.forEach((item) => doc.text(item, { lineGap: 4 }));

      // ---------------------------- POSTER ----------------------------
      if (fdp.brochure?.length) {
        fdp.brochure.forEach((poster, idx) => {
          doc.addPage();
          drawHeader(doc);
          doc
            .font("Helvetica-Bold")
            .fontSize(16)
            .fillColor("#4B0082")
            .text(`POSTER ${idx + 1}`, { align: "center", underline: true })
            .moveDown(1.5);

          const posterPath = path.resolve("server/uploads/", poster);
          if (fs.existsSync(posterPath)) {
            doc.image(posterPath, {
              fit: [470, 620],
              align: "center",
              valign: "center",
            });
          } else {
            doc.fontSize(12).fillColor("gray").text("Poster not found.", {
              align: "center",
            });
          }
        });
      }

      // ---------------------------- RESOURCE PERSON ----------------------------
      doc.addPage();
      drawHeader(doc);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#4B0082")
        .text("RESOURCE PERSON DETAILS", { align: "center", underline: true })
        .moveDown(1.5);

      if (fdp.resourcePersons?.length) {
        fdp.resourcePersons.forEach((rp, i) => {
          doc
            .font("Helvetica-Bold")
            .fontSize(12)
            .fillColor("black")
            .text(`${i + 1}. ${rp.name}`)
            .font("Helvetica")
            .text(`Designation: ${rp.designation || "N/A"}`)
            .text(`Institution: ${rp.institution || "N/A"}`)
            .text(`Email: ${rp.email || "N/A"}`)
            .text(`Phone: ${rp.phone || "N/A"}`)
            .text(`Other Info: ${rp.otherInformation || "N/A"}`)
            .moveDown(0.8);

          const imagePath = path.resolve("server/uploads/", rp.image || "");
          if (rp.image && fs.existsSync(imagePath)) {
            doc.image(imagePath, {
              width: 240,
              height: 260,
              align: "center",
            });
          }
          doc.moveDown(1.2);
        });
      } else {
        doc.text("No Resource Persons listed.", { align: "center" });
      }

      // ---------------------------- SESSION REPORT ----------------------------
      doc.addPage();
      drawHeader(doc);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#4B0082")
        .text("SESSION REPORT", { align: "center", underline: true })
        .moveDown(1.5)
        .font("Helvetica")
        .fontSize(12)
        .fillColor("black")
        .text(fdp.summary || "No session summary available.", { align: "justify" });

      // ---------------------------- ATTENDANCE ----------------------------
      doc.addPage();
      drawHeader(doc);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#4B0082")
        .text("ATTENDANCE", { align: "center", underline: true })
        .moveDown(1.5);

      const attPath = fdp.attendanceFile
        ? path.resolve("server/uploads/", fdp.attendanceFile)
        : null;

      if (attPath && fs.existsSync(attPath)) {
        doc.image(attPath, {
          width: 475,
          height: 595,
          align: "center",
        });
      } else {
        doc
          .font("Helvetica")
          .fontSize(12)
          .fillColor("black")
          .text("No attendance file uploaded.", { align: "center" });
      }

      // ---------------------------- PHOTOS ----------------------------
      if (fdp.geoTagPhotos?.length) {
        fdp.geoTagPhotos.forEach((photo, i) => {
          doc.addPage();
          drawHeader(doc);
          doc
            .font("Helvetica-Bold")
            .fontSize(16)
            .fillColor("#4B0082")
            .text(`PHOTO ${i + 1}`, { align: "center", underline: true })
            .moveDown(1.5);

          const photoPath = path.resolve("server/uploads/", photo);
          if (fs.existsSync(photoPath)) {
            doc.image(photoPath, {
              width: 370,
              height: 285,
              align: "center",
            });
          } else {
            doc
              .fontSize(12)
              .fillColor("gray")
              .text("Photo not found or invalid file.", { align: "center" });
          }
        });
      }

      // ---------------------------- FEEDBACK ----------------------------
      doc.addPage();
      drawHeader(doc);
      doc
        .font("Helvetica-Bold")
        .fontSize(16)
        .fillColor("#4B0082")
        .text("FEEDBACK FORM", { align: "center", underline: true })
        .moveDown(1.5);

      const fbPath = fdp.feedback && typeof fdp.feedback === "string"
        ? path.resolve("server/uploads/", fdp.feedback)
        : null;

      if (fbPath && fs.existsSync(fbPath)) {
        doc.image(fbPath, {
          width: 475,
          height: 595,
          align: "center",
        });
      } else {
        doc
          .font("Helvetica")
          .fontSize(12)
          .fillColor("black")
          .text("No feedback form uploaded.", { align: "center" });
      }

      // ---------------------------- FOOTER ----------------------------
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
          new Paragraph({
            text: "ACTIVITY ATTENDED REPORT",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(`Activity Name: ${fdp.activityName || "N/A"}`),
          new Paragraph(`Coordinator: ${fdp.coordinator || "N/A"}`),
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

// ---------------------------- FDP Conducted / Expert Talk (Reuse Template) ----------------------------
export const generateFDPConductedPDF = async (fdp, pdfPath) =>
  generateFDPAttendedPDF(fdp, pdfPath);

export const generateFDPConductedWord = async (fdp, wordPath) =>
  generateFDPAttendedWord(fdp, wordPath);

export const generateExpertTalkPDF = async (talk, pdfPath) =>
  generateFDPAttendedPDF(talk, pdfPath);

export const generateExpertTalkWord = async (talk, wordPath) =>
  generateFDPAttendedWord(talk, wordPath);
