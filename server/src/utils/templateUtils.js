// // server/src/utils/templateUtils.js


// import PDFDocument from "pdfkit";
// import fs from "fs";
// import { Document, Packer, Paragraph, TextRun } from "docx";

// // ------------------------ FDP Attended ------------------------

// // ✅ Generate PDF for FDP Attended
// export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(pdfPath);
//       doc.pipe(stream);

//       doc.fontSize(20).text("FDP Attended Report", { underline: true });
//       doc.moveDown();

//       doc.fontSize(14).text(`Title: ${fdp.title || "N/A"}`);
//       if (fdp.summary) doc.text(`Summary: ${fdp.summary}`);
//       if (fdp.toc) doc.text(`TOC: ${fdp.toc}`);
//       doc.text(`Created By: ${fdp.createdBy || "N/A"}`);
//       doc.moveDown();

//       if (fdp.resourcePersons?.length) {
//         doc.fontSize(16).text("Resource Persons:", { underline: true });
//         fdp.resourcePersons.forEach((rp, i) => {
//           doc.fontSize(12).text(
//             `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${rp.institution || "N/A"})`
//           );
//         });
//         doc.moveDown();
//       }

//       if (fdp.geoTagPhotos?.length) {
//         doc.fontSize(16).text("Geo-Tagged Photos:", { underline: true });
//         fdp.geoTagPhotos.forEach((photo, i) => {
//           doc.fontSize(12).text(`${i + 1}. ${photo}`);
//         });
//         doc.moveDown();
//       }

//       if (fdp.feedback) {
//         doc.fontSize(16).text("Feedback:", { underline: true });
//         doc.fontSize(12).text(
//           typeof fdp.feedback === "object"
//             ? JSON.stringify(fdp.feedback, null, 2)
//             : fdp.feedback
//         );
//         doc.moveDown();
//       }

//       if (fdp.brochure) {
//         doc.fontSize(16).text("Brochure:", { underline: true });
//         doc.fontSize(12).text(fdp.brochure);
//       }

//       doc.end();
//       stream.on("finish", resolve);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// // ✅ Generate Word for FDP Attended
// export const generateFDPAttendedWord = async (fdp, wordPath) => {
//   try {
//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph({ children: [new TextRun({ text: "FDP Attended Report", bold: true, size: 36 })] }),
//             new Paragraph({ text: "" }),
//             new Paragraph({ children: [new TextRun(`Title: ${fdp.title || "N/A"}`)] }),
//             fdp.summary && new Paragraph({ children: [new TextRun(`Summary: ${fdp.summary}`)] }),
//             fdp.toc && new Paragraph({ children: [new TextRun(`TOC: ${fdp.toc}`)] }),
//             new Paragraph({ children: [new TextRun(`Created By: ${fdp.createdBy || "N/A"}`)] }),
//             ...(fdp.resourcePersons || []).map(
//               (rp, i) =>
//                 new Paragraph({
//                   children: [
//                     new TextRun(
//                       `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${rp.institution || "N/A"})`
//                     ),
//                   ],
//                 })
//             ),
//             ...(fdp.geoTagPhotos || []).map(
//               (photo, i) => new Paragraph({ children: [new TextRun(`${i + 1}. ${photo}`)] })
//             ),
//             fdp.feedback
//               ? new Paragraph({
//                   children: [
//                     new TextRun(
//                       typeof fdp.feedback === "object"
//                         ? JSON.stringify(fdp.feedback, null, 2)
//                         : fdp.feedback
//                     ),
//                   ],
//                 })
//               : null,
//             fdp.brochure
//               ? new Paragraph({ children: [new TextRun(`Brochure: ${fdp.brochure}`)] })
//               : null,
//           ].filter(Boolean), // ✅ Remove any null entries
//         },
//       ],
//     });

//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync(wordPath, buffer);
//   } catch (err) {
//     throw err;
//   }
// };

// /**
//  * Generate PDF report for FDP Conducted
//  */
// export const generateFDPConductedPDF = async (fdp, pdfPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(pdfPath);
//       doc.pipe(stream);

//       doc.fontSize(20).text("FDP Conducted Report", { underline: true });
//       doc.moveDown();

//       doc.fontSize(14).text(`Title: ${fdp.title}`);
//       if (fdp.summary) doc.text(`Summary: ${fdp.summary}`);
//       if (fdp.toc) doc.text(`TOC: ${fdp.toc}`);
//       if (fdp.createdBy) doc.text(`Conducted By: ${fdp.createdBy}`);
//       doc.moveDown();

//       if (fdp.resourcePersons?.length) {
//         doc.fontSize(16).text("Resource Persons:", { underline: true });
//         fdp.resourcePersons.forEach((rp, i) => {
//           doc.fontSize(12).text(
//             `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${rp.institution || "N/A"})`
//           );
//         });
//         doc.moveDown();
//       }

//       doc.end();
//       stream.on("finish", resolve);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// /**
//  * Generate Word report for FDP Conducted
//  */
// export const generateFDPConductedWord = async (fdp, wordPath) => {
//   try {
//     const children = [];

//     children.push(new Paragraph({ children: [new TextRun({ text: "FDP Conducted Report", bold: true })] }));
//     children.push(new Paragraph(""));

//     addTextParagraphs(`Title: ${fdp.title}`, children);
//     if (fdp.summary) addTextParagraphs(`Summary: ${fdp.summary}`, children);
//     if (fdp.toc) addTextParagraphs(`TOC: ${fdp.toc}`, children);
//     addTextParagraphs(`Conducted By: ${fdp.createdBy || "N/A"}`, children);
//     children.push(new Paragraph(""));

//     if (fdp.resourcePersons?.length) {
//       fdp.resourcePersons.forEach((rp, i) => {
//         addTextParagraphs(
//           `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${rp.institution || "N/A"})`,
//           children
//         );
//       });
//     }

//     const doc = new Document({ sections: [{ children }] });
//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync(wordPath, buffer);
//   } catch (err) {
//     console.error("Error generating Word file:", err);
//     throw err;
//   }
// };

// // ------------------------ Expert Talk ------------------------

// export const generateExpertTalkPDF = async (expertTalk, pdfPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(pdfPath);
//       doc.pipe(stream);

//       doc.fontSize(20).text("Expert Talk Report", { underline: true });
//       doc.moveDown();

//       doc.fontSize(14).text(`Title: ${expertTalk.title || "N/A"}`);
//       if (expertTalk.speaker) doc.text(`Speaker: ${expertTalk.speaker}`);
//       if (expertTalk.date) doc.text(`Date: ${expertTalk.date}`);
//       if (expertTalk.venue) doc.text(`Venue: ${expertTalk.venue}`);
//       if (expertTalk.summary) doc.text(`Summary: ${expertTalk.summary}`);

//       doc.end();
//       stream.on("finish", resolve);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

// export const generateExpertTalkWord = async (expertTalk, wordPath) => {
//   try {
//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph({ children: [new TextRun({ text: "Expert Talk Report", bold: true, size: 36 })] }),
//             new Paragraph({ text: "" }),
//             new Paragraph({ children: [new TextRun(`Title: ${expertTalk.title || "N/A"}`)] }),
//             expertTalk.speaker && new Paragraph({ children: [new TextRun(`Speaker: ${expertTalk.speaker}`)] }),
//             expertTalk.date && new Paragraph({ children: [new TextRun(`Date: ${expertTalk.date}`)] }),
//             expertTalk.venue && new Paragraph({ children: [new TextRun(`Venue: ${expertTalk.venue}`)] }),
//             expertTalk.summary && new Paragraph({ children: [new TextRun(`Summary: ${expertTalk.summary}`)] }),
//           ].filter(Boolean),
//         },
//       ],
//     });

//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync(wordPath, buffer);
//   } catch (err) {
//     throw err;
//   }
// };





// server/src/utils/templateUtils.js

// server/src/utils/templateUtils.js

import PDFDocument from "pdfkit";
import fs from "fs";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";

// ---------------------------- FDP Attended PDF ----------------------------
export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      // Page 1 - Summary
      doc.fontSize(20).fillColor("#4B0082").text("ACTIVITY ATTENDED REPORT", { align: "center", underline: true });
      doc.moveDown(2);
      doc.fontSize(12).fillColor("black");
      doc.text(`Activity Name: ${fdp.activityName || "N/A"}`);
      doc.text(`Co-ordinator: ${fdp.coordinator || "N/A"}`);
      doc.text(`Date: ${fdp.date || "N/A"}`);
      doc.text(`Duration: ${fdp.duration || "N/A"}`);
      doc.text(`PO & POs: ${fdp.pos || "N/A"}`);
      doc.addPage();

      // Table of Contents
      doc.fontSize(18).fillColor("#4B0082").text("TABLE OF CONTENTS", { align: "center", underline: true });
      doc.moveDown();
      const contents = [
        "1. INVITATION",
        "2. POSTER",
        "3. RESOURCE PERSON DETAILS",
        "4. SESSION REPORT",
        "5. ATTENDANCE",
        "6. PHOTOS",
        "7. FEEDBACK",
      ];
      doc.fontSize(12).fillColor("black");
      contents.forEach((item) => doc.text(item));
      doc.addPage();

      // Resource Persons
      doc.fontSize(16).fillColor("#4B0082").text("RESOURCE PERSON DETAILS", { underline: true });
      doc.moveDown();
      fdp.resourcePersons?.length
        ? fdp.resourcePersons.forEach((rp, i) =>
            doc.text(`${i + 1}. ${rp.name} — ${rp.designation} (${rp.institution})`)
          )
        : doc.text("No Resource Persons listed.");
      doc.addPage();

      // Session Report
      doc.fontSize(16).fillColor("#4B0082").text("SESSION REPORT", { underline: true });
      doc.moveDown();
      doc.fontSize(12).fillColor("black").text(fdp.summary || "No session summary available.");
      doc.addPage();

      // Attendance
      doc.fontSize(16).fillColor("#4B0082").text("ATTENDANCE", { underline: true });
      doc.moveDown();
      if (fdp.attendanceFile) doc.text(`Attendance File: ${fdp.attendanceFile}`);
      else doc.text("No attendance file uploaded.");
      doc.addPage();

      // Photos
      doc.fontSize(16).fillColor("#4B0082").text("PHOTOS", { underline: true });
      doc.moveDown();
      fdp.geoTagPhotos?.length
        ? fdp.geoTagPhotos.forEach((p, i) => doc.text(`${i + 1}. ${p}`))
        : doc.text("No photos available.");
      doc.addPage();

      // Feedback
      doc.fontSize(16).fillColor("#4B0082").text("FEEDBACK", { underline: true });
      doc.moveDown();
      doc.text(typeof fdp.feedback === "object" ? JSON.stringify(fdp.feedback, null, 2) : fdp.feedback || "No feedback.");

      doc.end();
      stream.on("finish", resolve);
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

// ---------------------------- FDP Conducted PDF ----------------------------
export const generateFDPConductedPDF = async (fdp, pdfPath) => {
  return generateFDPAttendedPDF(fdp, pdfPath);
};

// ---------------------------- FDP Conducted Word ----------------------------
export const generateFDPConductedWord = async (fdp, wordPath) => {
  return generateFDPAttendedWord(fdp, wordPath);
};

// ---------------------------- Expert Talk PDF ----------------------------
export const generateExpertTalkPDF = async (expertTalk, pdfPath) => {
  // For now, reuse the same structure — can be customized later
  return generateFDPAttendedPDF(expertTalk, pdfPath);
};

// ---------------------------- Expert Talk Word ----------------------------
export const generateExpertTalkWord = async (expertTalk, wordPath) => {
  // Reuse same structure for now
  return generateFDPAttendedWord(expertTalk, wordPath);
};
