// server/src/utils/templateUtils.js

import PDFDocument from "pdfkit";
import fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "docx";

/**
 * Helper to safely add text to Word document
 */
const addTextParagraphs = (text, childrenArray) => {
  if (!text) return;
  const lines = String(text).split(/\r?\n/);
  lines.forEach((line) => {
    if (line.trim() !== "") {
      childrenArray.push(new Paragraph({ children: [new TextRun(line)] }));
    }
  });
};

/**
 * Generate PDF report for FDP Attended
 */
// export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 50 });
//       const stream = fs.createWriteStream(pdfPath);
//       doc.pipe(stream);

//       doc.fontSize(20).text("FDP Attended Report", { underline: true });
//       doc.moveDown();

//       doc.fontSize(14).text(`Title: ${fdp.title}`);
//       if (fdp.summary) doc.text(`Summary: ${fdp.summary}`);
//       if (fdp.toc) doc.text(`TOC: ${fdp.toc}`);
//       if (fdp.createdBy) doc.text(`Created By: ${fdp.createdBy}`);
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
//           typeof fdp.feedback === "object" ? JSON.stringify(fdp.feedback, null, 2) : fdp.feedback
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

/**
 * Generate PDF report for FDP Attended
 */
export const generateFDPAttendedPDF = async (fdp, pdfPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      // Header
      doc.fontSize(20).text("FDP Attended Report", { underline: true });
      doc.moveDown();

      // Main info
      doc.fontSize(14).text(`Title: ${fdp.title || "N/A"}`);
      if (fdp.date) doc.text(`Date: ${fdp.date}`); // ✅ Added
      if (fdp.venue) doc.text(`Venue: ${fdp.venue}`); // ✅ Added
      if (fdp.summary) doc.text(`Summary: ${fdp.summary}`);
      if (fdp.toc) doc.text(`TOC: ${fdp.toc}`);
      if (fdp.createdBy) doc.text(`Created By: ${fdp.createdBy}`);
      doc.moveDown();

      // Resource persons
      if (fdp.resourcePersons?.length) {
        doc.fontSize(16).text("Resource Persons:", { underline: true });
        fdp.resourcePersons.forEach((rp, i) => {
          doc
            .fontSize(12)
            .text(
              `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${
                rp.institution || "N/A"
              })`
            );
        });
        doc.moveDown();
      }

      // Geo-tagged photos
      if (fdp.geoTagPhotos?.length) {
        doc.fontSize(16).text("Geo-Tagged Photos:", { underline: true });
        fdp.geoTagPhotos.forEach((photo, i) => {
          doc.fontSize(12).text(`${i + 1}. ${photo}`);
        });
        doc.moveDown();
      }

      // Feedback
      if (fdp.feedback) {
        doc.fontSize(16).text("Feedback:", { underline: true });
        doc
          .fontSize(12)
          .text(
            typeof fdp.feedback === "object"
              ? JSON.stringify(fdp.feedback, null, 2)
              : fdp.feedback
          );
        doc.moveDown();
      }

      // Brochure
      if (fdp.brochure) {
        doc.fontSize(16).text("Brochure:", { underline: true });
        doc.fontSize(12).text(fdp.brochure);
      }

      doc.end();
      stream.on("finish", resolve);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate Word report for FDP Attended
 */
// export const generateFDPAttendedWord = async (fdp, wordPath) => {
//   try {
//     const children = [];

//     children.push(
//       new Paragraph({ children: [new TextRun({ text: "FDP Attended Report", bold: true })] })
//     );
//     children.push(new Paragraph("")); // line break

//     addTextParagraphs(`Title: ${fdp.title}`, children);
//     if (fdp.summary) addTextParagraphs(`Summary: ${fdp.summary}`, children);
//     if (fdp.toc) addTextParagraphs(`TOC: ${fdp.toc}`, children);
//     addTextParagraphs(`Created By: ${fdp.createdBy || "N/A"}`, children);
//     children.push(new Paragraph(""));

//     if (fdp.resourcePersons?.length) {
//       addTextParagraphs("Resource Persons:", children);
//       fdp.resourcePersons.forEach((rp, i) => {
//         addTextParagraphs(
//           `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${rp.institution || "N/A"})`,
//           children
//         );
//       });
//       children.push(new Paragraph(""));
//     }

//     if (fdp.geoTagPhotos?.length) {
//       addTextParagraphs("Geo-Tagged Photos:", children);
//       fdp.geoTagPhotos.forEach((photo, i) => addTextParagraphs(`${i + 1}. ${photo}`, children));
//       children.push(new Paragraph(""));
//     }

//     if (fdp.feedback) {
//       addTextParagraphs("Feedback:", children);
//       if (typeof fdp.feedback === "object") addTextParagraphs(JSON.stringify(fdp.feedback, null, 2), children);
//       else addTextParagraphs(fdp.feedback, children);
//       children.push(new Paragraph(""));
//     }

//     if (fdp.brochure) addTextParagraphs(`Brochure: ${fdp.brochure}`, children);

//     const doc = new Document({ sections: [{ children }] });

//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync(wordPath, buffer);
//   } catch (err) {
//     console.error("Error generating Word file:", err);
//     throw err;
//   }
// };

/**
 * Generate Word report for FDP Attended
 */
export const generateFDPAttendedWord = async (fdp, wordPath) => {
  try {
    const children = [];

    // Title header
    children.push(
      new Paragraph({
        children: [new TextRun({ text: "FDP Attended Report", bold: true })],
      })
    );
    children.push(new Paragraph("")); // blank line

    // ✅ Added Date & Venue
    addTextParagraphs(`Title: ${fdp.title}`, children);
    if (fdp.date) addTextParagraphs(`Date: ${fdp.date}`, children);
    if (fdp.venue) addTextParagraphs(`Venue: ${fdp.venue}`, children);
    if (fdp.summary) addTextParagraphs(`Summary: ${fdp.summary}`, children);
    if (fdp.toc) addTextParagraphs(`TOC: ${fdp.toc}`, children);
    addTextParagraphs(`Created By: ${fdp.createdBy || "N/A"}`, children);
    children.push(new Paragraph(""));

    // Resource Persons
    if (fdp.resourcePersons?.length) {
      addTextParagraphs("Resource Persons:", children);
      fdp.resourcePersons.forEach((rp, i) => {
        addTextParagraphs(
          `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${
            rp.institution || "N/A"
          })`,
          children
        );
      });
      children.push(new Paragraph(""));
    }

    // Geo-tagged photos
    if (fdp.geoTagPhotos?.length) {
      addTextParagraphs("Geo-Tagged Photos:", children);
      fdp.geoTagPhotos.forEach((photo, i) =>
        addTextParagraphs(`${i + 1}. ${photo}`, children)
      );
      children.push(new Paragraph(""));
    }

    // Feedback
    if (fdp.feedback) {
      addTextParagraphs("Feedback:", children);
      if (typeof fdp.feedback === "object")
        addTextParagraphs(JSON.stringify(fdp.feedback, null, 2), children);
      else addTextParagraphs(fdp.feedback, children);
      children.push(new Paragraph(""));
    }

    // Brochure
    if (fdp.brochure) addTextParagraphs(`Brochure: ${fdp.brochure}`, children);

    // Create document
    const doc = new Document({ sections: [{ children }] });
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(wordPath, buffer);
  } catch (err) {
    console.error("Error generating Word file:", err);
    throw err;
  }
};

/**
 * Generate PDF report for FDP Conducted
 */
export const generateFDPConductedPDF = async (fdp, pdfPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      doc.fontSize(20).text("FDP Conducted Report", { underline: true });
      doc.moveDown();

      doc.fontSize(14).text(`Title: ${fdp.title}`);
      if (fdp.summary) doc.text(`Summary: ${fdp.summary}`);
      if (fdp.toc) doc.text(`TOC: ${fdp.toc}`);
      if (fdp.createdBy) doc.text(`Conducted By: ${fdp.createdBy}`);
      doc.moveDown();

      if (fdp.resourcePersons?.length) {
        doc.fontSize(16).text("Resource Persons:", { underline: true });
        fdp.resourcePersons.forEach((rp, i) => {
          doc
            .fontSize(12)
            .text(
              `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${
                rp.institution || "N/A"
              })`
            );
        });
        doc.moveDown();
      }

      doc.end();
      stream.on("finish", resolve);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate Word report for FDP Conducted
 */
export const generateFDPConductedWord = async (fdp, wordPath) => {
  try {
    const children = [];

    children.push(
      new Paragraph({
        children: [new TextRun({ text: "FDP Conducted Report", bold: true })],
      })
    );
    children.push(new Paragraph(""));

    addTextParagraphs(`Title: ${fdp.title}`, children);
    if (fdp.summary) addTextParagraphs(`Summary: ${fdp.summary}`, children);
    if (fdp.toc) addTextParagraphs(`TOC: ${fdp.toc}`, children);
    addTextParagraphs(`Conducted By: ${fdp.createdBy || "N/A"}`, children);
    children.push(new Paragraph(""));

    if (fdp.resourcePersons?.length) {
      fdp.resourcePersons.forEach((rp, i) => {
        addTextParagraphs(
          `${i + 1}. ${rp.name || "N/A"} — ${rp.designation || "N/A"} (${
            rp.institution || "N/A"
          })`,
          children
        );
      });
    }

    const doc = new Document({ sections: [{ children }] });
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(wordPath, buffer);
  } catch (err) {
    console.error("Error generating Word file:", err);
    throw err;
  }
};

/**
 * Generate PDF report for Expert Talk
 */
export const generateExpertTalkPDF = async (expertTalk, pdfPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(pdfPath);
      doc.pipe(stream);

      doc.fontSize(20).text("Expert Talk Report", { underline: true });
      doc.moveDown();

      doc.fontSize(14).text(`Title: ${expertTalk.title}`);
      if (expertTalk.speaker) doc.text(`Speaker: ${expertTalk.speaker}`);
      if (expertTalk.date) doc.text(`Date: ${expertTalk.date}`);
      if (expertTalk.venue) doc.text(`Venue: ${expertTalk.venue}`);
      if (expertTalk.summary) doc.text(`Summary: ${expertTalk.summary}`);

      doc.end();
      stream.on("finish", resolve);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Generate Word report for Expert Talk
 */
export const generateExpertTalkWord = async (expertTalk, wordPath) => {
  try {
    const children = [];

    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Expert Talk Report", bold: true })],
      })
    );
    children.push(new Paragraph(""));

    addTextParagraphs(`Title: ${expertTalk.title}`, children);
    if (expertTalk.speaker)
      addTextParagraphs(`Speaker: ${expertTalk.speaker}`, children);
    if (expertTalk.date)
      addTextParagraphs(`Date: ${expertTalk.date}`, children);
    if (expertTalk.venue)
      addTextParagraphs(`Venue: ${expertTalk.venue}`, children);
    if (expertTalk.summary)
      addTextParagraphs(`Summary: ${expertTalk.summary}`, children);

    const doc = new Document({ sections: [{ children }] });
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(wordPath, buffer);
  } catch (err) {
    console.error("Error generating Word file:", err);
    throw err;
  }
};

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
