
// // server/src/utils/fdpTemplateUtils.js
// // server/src/utils/fdpTemplateUtils.js
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import PDFDocument from "pdfkit";
// import {
//   Document,
//   Packer,
//   Paragraph,
//   TextRun,
//   Table,
//   TableRow,
//   TableCell,
//   AlignmentType,
//   ImageRun,
//   Footer,
// } from "docx";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const leftLogo = path.join(__dirname, "../asserts/atria-logo.png");
// const rightLogo = path.join(__dirname, "../asserts/atria-25years.png");

// /* ----------------------------- Helper: Word Table -------------------------- */
// const createWordTable = (rows) => {
//   return new Table({
//     width: { size: 100, type: "pct" },
//     rows: rows.map(
//       ([label, value]) =>
//         new TableRow({
//           children: [
//             new TableCell({
//               width: { size: 30, type: "pct" },
//               children: [
//                 new Paragraph({
//                   children: [
//                     new TextRun({
//                       text: label,
//                       bold: true,
//                       size: 24, // 12pt
//                       color: "a52a2a",
//                     }),
//                   ],
//                 }),
//               ],
//             }),
//             new TableCell({
//               width: { size: 70, type: "pct" },
//               children: [
//                 new Paragraph({
//                   children: [
//                     new TextRun({
//                       text: value || "",
//                       size: 24,
//                     }),
//                   ],
//                 }),
//               ],
//             }),
//           ],
//         })
//     ),
//   });
// };

// /* ---------------------------- Helper: safeImageRead ------------------------ */
// const safeReadImage = (imgPath) => {
//   try {
//     if (!imgPath) return null;
//     if (!fs.existsSync(imgPath)) return null;
//     return fs.readFileSync(imgPath);
//   } catch {
//     return null;
//   }
// };

// /* -------------------------------------------------------------------------- */
// /* 🧾 1️⃣ Generate FDP Attended PDF                                            */
// /* -------------------------------------------------------------------------- */
// export const generateFDPAttendedPDF = (fdpData = {}, outputPath) => {
//   return new Promise((resolve, reject) => {
//     try {
//       const doc = new PDFDocument({ margin: 48, size: "A4" });
//       const stream = fs.createWriteStream(outputPath);
//       doc.pipe(stream);

//       // ---------- header logos ----------
//       const topY = 30;
//       if (fs.existsSync(leftLogo)) {
//         try {
//           doc.image(leftLogo, 50, topY, { width: 90 });
//         } catch (e) {
//           // ignore image load errors
//         }
//       }
//       if (fs.existsSync(rightLogo)) {
//         try {
//           doc.image(rightLogo, 460, topY, { width: 90 });
//         } catch (e) {}
//       }

//       // ---------- institute heading ----------
//       doc
//         .moveDown(0.6)
//         .font("Times-Bold")
//         .fontSize(16)
//         .fillColor("#a52a2a")
//         .text("ATRIA INSTITUTE OF TECHNOLOGY", { align: "center" });

//       doc
//         .font("Times-Roman")
//         .fontSize(10.5)
//         .fillColor("black")
//         .text("(An Autonomous Institution, Affiliated to VTU, Approved by AICTE)", { align: "center" });

//       doc
//         .moveDown(0.2)
//         .font("Times-Roman")
//         .fontSize(12)
//         .fillColor("#4B0082")
//         .text("Department of Computer Science and Engineering", { align: "center" });

//       // ---------- main heading ----------
//       doc.moveDown(0.8);
//       doc
//         .font("Times-Bold")
//         .fontSize(14)
//         .fillColor("#a52a2a")
//         .text("ACTIVITY ATTENDED REPORT", { align: "center", underline: true });

//       // ---------- summary table (two columns) ----------
//       doc.moveDown(1.0);
//       const summary = [
//         ["Activity Name", fdpData.activityName || ""],
//         ["Coordinator(s)", fdpData.coordinator || ""],
//         ["Date", fdpData.date || ""],
//         ["Duration", fdpData.duration || ""],
//         ["Venue", fdpData.venue || ""],
//         ["POs/PSOs", fdpData.pos || ""],
//       ];

//       const leftX = 72;
//       const labelWidth = 150;
//       const valueX = leftX + labelWidth + 8;
//       let y = doc.y;

//       doc.font("Times-Roman").fontSize(12).fillColor("black");
//       summary.forEach(([label, value]) => {
//         doc
//           .font("Times-Bold")
//           .fillColor("#a52a2a")
//           .text(label, leftX, y, { width: labelWidth, continued: false });
//         doc
//           .font("Times-Roman")
//           .fillColor("black")
//           .text(String(value || ""), valueX, y, { width: 330 });
//         y += 20;
//       });

//       // ---------- Session Report page ----------
//       doc.addPage();
//       doc
//         .font("Times-Bold")
//         .fontSize(13)
//         .fillColor("#a52a2a")
//         .text("SESSION REPORT", { align: "center", underline: true });
//       doc.moveDown(0.7);

//       doc
//         .font("Times-Roman")
//         .fontSize(11)
//         .fillColor("black");

//       // Keep summary text safe and long paragraphs wrapped
//       const summaryText = fdpData.summary || "Session report details go here...";
//       doc.text(summaryText, {
//         align: "left",
//         indent: 24,
//         lineGap: 4,
//       });

//       // ---------- Photos page ----------
//       doc.addPage();
//       doc
//         .font("Times-Bold")
//         .fontSize(13)
//         .fillColor("#a52a2a")
//         .text("GEO-TAGGED PHOTOS", { align: "center", underline: true });
//       doc.moveDown(0.7);

//       const photos = fdpData.geoTagPhotos || []; // expects array of { path or filename }
//       // We'll attempt to embed images if paths are actual file paths relative to server.
//       // We'll also list the filename under the image.
//       const photosPerRow = 2;
//       const imgBoxWidth = 240;
//       const imgBoxHeight = 160;
//       const gap = 20;
//       let startX = 70;
//       let currentX = startX;
//       let currentY = doc.y;

//       for (let i = 0; i < photos.length; i++) {
//         const photo = photos[i]; // could be filename string or full path
//         let filepath = photo;
//         // Try absolute path or in upload folder:
//         if (!fs.existsSync(filepath)) {
//           // try common server uploads folder:
//           const tryPath = path.join(process.cwd(), "uploads", photo);
//           if (fs.existsSync(tryPath)) filepath = tryPath;
//           else {
//             // try client path if user saved from client into asserts (edge), fallback to photo string only
//             filepath = null;
//           }
//         }

//         if (filepath && fs.existsSync(filepath)) {
//           try {
//             doc.image(filepath, currentX, currentY, { fit: [imgBoxWidth, imgBoxHeight], align: "center" });
//           } catch (e) {
//             // ignore single image fail
//             doc
//               .rect(currentX, currentY, imgBoxWidth, imgBoxHeight)
//               .stroke("#e0e0e0");
//             doc.text("Image not available", currentX + 10, currentY + 10);
//           }
//         } else {
//           // draw placeholder box
//           doc
//             .rect(currentX, currentY, imgBoxWidth, imgBoxHeight)
//             .stroke("#e0e0e0");
//           doc.text("Image not available", currentX + 10, currentY + 10);
//         }

//         // filename caption
//         const captionX = currentX;
//         const captionY = currentY + imgBoxHeight + 6;
//         const filenameText = typeof photo === "string" ? path.basename(photo) : "photo";
//         doc.font("Times-Roman").fontSize(10).fillColor("#444444").text(filenameText, captionX, captionY);

//         // move to next position
//         if ((i + 1) % photosPerRow === 0) {
//           currentX = startX;
//           currentY = captionY + 30;
//         } else {
//           currentX += imgBoxWidth + gap;
//         }
//       }

//       // If no photos, show message
//       if (photos.length === 0) {
//         doc.moveDown(0.5);
//         doc.font("Times-Roman").fontSize(11).text("No geo-tagged photos provided.", { align: "left" });
//       }

//       // ---------- Resource Persons page ----------
//       doc.addPage();
//       doc
//         .font("Times-Bold")
//         .fontSize(13)
//         .fillColor("#a52a2a")
//         .text("RESOURCE PERSON DETAILS", { align: "center", underline: true });
//       doc.moveDown(0.7);

//       const persons = fdpData.resourcePersons || [];
//       if (persons.length === 0) {
//         // placeholder single blank
//         doc.font("Times-Roman").fontSize(11).text("No resource persons added.", { align: "left" });
//       } else {
//         persons.forEach((p, idx) => {
//           doc
//             .font("Times-Bold")
//             .fontSize(12)
//             .fillColor("#4B0082")
//             .text(`Name: `, { continued: true });
//           doc.font("Times-Roman").fillColor("black").text(p.name || "N/A");
//           doc.moveDown(0.2);

//           doc
//             .font("Times-Bold")
//             .fillColor("#a52a2a")
//             .text("Designation: ", { continued: true });
//           doc.font("Times-Roman").fillColor("black").text(p.designation || "N/A");
//           doc.moveDown(0.2);

//           doc
//             .font("Times-Bold")
//             .fillColor("#a52a2a")
//             .text("Institution: ", { continued: true });
//           doc.font("Times-Roman").fillColor("black").text(p.institution || "N/A");
//           doc.moveDown(0.2);

//           doc
//             .font("Times-Bold")
//             .fillColor("#a52a2a")
//             .text("Email: ", { continued: true });
//           doc.font("Times-Roman").fillColor("black").text(p.email || "N/A");
//           doc.moveDown(0.2);

//           doc
//             .font("Times-Bold")
//             .fillColor("#a52a2a")
//             .text("Phone: ", { continued: true });
//           doc.font("Times-Roman").fillColor("black").text(p.phone || "N/A");
//           doc.moveDown(0.2);

//           if (p.image) {
//             // try to load resource person image
//             let imgPath = p.image;
//             if (!fs.existsSync(imgPath)) {
//               const tryPath = path.join(process.cwd(), "uploads", path.basename(p.image));
//               if (fs.existsSync(tryPath)) imgPath = tryPath;
//               else imgPath = null;
//             }
//             if (imgPath) {
//               try {
//                 doc.image(imgPath, { fit: [120, 120] });
//               } catch (e) {
//                 // ignore
//               }
//             }
//           }

//           doc.moveDown(0.6);
//           doc
//             .font("Times-Bold")
//             .fillColor("#a52a2a")
//             .text("Other Information: ", { continued: true });
//           doc.font("Times-Roman").fillColor("black").text(p.otherInformation || "N/A");
//           doc.moveDown(1.0);
//         });
//       }

//       // ---------- Footer ----------
//       const footerText = "Department of Computer Science and Engineering | Academic Year 2024–25";
//       // place footer on last page bottom and rely on PDF readers - we can also add to each page individually if desired.
//       const range = doc.bufferedPageRange ? doc.bufferedPageRange() : null;
//       // simple footer on final page
//       doc
//         .font("Times-Roman")
//         .fontSize(10)
//         .fillColor("#444444")
//         .text(footerText, 0, doc.page.height - 50, { align: "center" });

//       // finalize
//       doc.end();
//       stream.on("finish", () => resolve(outputPath));
//       stream.on("error", (err) => reject(err));
//     } catch (err) {
//       return reject(err);
//     }
//   });
// };

// /* -------------------------------------------------------------------------- */
// /* 🧾 2️⃣ Generate FDP Attended Word (DOCX)                                   */
// /* -------------------------------------------------------------------------- */
// export const generateFDPAttendedTemplateWord = async (fdpData = {}, outputPath) => {
//   try {
//     // Build a small header table with left logo, center text, right logo
//     const leftImage = safeReadImage(leftLogo);
//     const rightImage = safeReadImage(rightLogo);

//     const headerTableChildren = [
//       // left logo cell
//       new TableCell({
//         width: { size: 20, type: "pct" },
//         children: [
//           new Paragraph({
//             children: leftImage
//               ? [
//                   new ImageRun({
//                     data: leftImage,
//                     transformation: { width: 90, height: 60 },
//                   }),
//                 ]
//               : [new TextRun({ text: "" })],
//           }),
//         ],
//       }),
//       // center text cell
//       new TableCell({
//         width: { size: 60, type: "pct" },
//         children: [
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             children: [
//               new TextRun({
//                 text: "ATRIA INSTITUTE OF TECHNOLOGY",
//                 bold: true,
//                 size: 28,
//                 color: "a52a2a",
//               }),
//             ],
//           }),
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             children: [
//               new TextRun({
//                 text: "(An Autonomous Institution, Affiliated to VTU, Approved by AICTE)",
//                 size: 18,
//               }),
//             ],
//           }),
//           new Paragraph({
//             alignment: AlignmentType.CENTER,
//             children: [
//               new TextRun({
//                 text: "Department of Computer Science and Engineering",
//                 size: 20,
//                 color: "4B0082",
//               }),
//             ],
//           }),
//         ],
//       }),
//       // right logo cell
//       new TableCell({
//         width: { size: 20, type: "pct" },
//         children: [
//           new Paragraph({
//             children: rightImage
//               ? [
//                   new ImageRun({
//                     data: rightImage,
//                     transformation: { width: 90, height: 60 },
//                   }),
//                 ]
//               : [new TextRun({ text: "" })],
//           }),
//         ],
//       }),
//     ];

//     // Build main children paragraphs and tables
//     const children = [];

//     children.push(new Paragraph({})); // small spacer
//     children.push(
//       new Paragraph({
//         alignment: AlignmentType.CENTER,
//         children: [
//           new TextRun({
//             text: "ACTIVITY ATTENDED REPORT",
//             bold: true,
//             color: "a52a2a",
//             size: 26,
//           }),
//         ],
//       })
//     );
//     children.push(new Paragraph({}));

//     // Summary table rows
//     const summaryRows = [
//       ["Activity Name", fdpData.activityName || ""],
//       ["Coordinator(s)", fdpData.coordinator || ""],
//       ["Date", fdpData.date || ""],
//       ["Duration", fdpData.duration || ""],
//       ["Venue", fdpData.venue || ""],
//       ["POs/PSOs", fdpData.pos || ""],
//     ];

//     children.push(createWordTable(summaryRows));
//     children.push(new Paragraph({}));

//     // Session report
//     children.push(
//       new Paragraph({
//         alignment: AlignmentType.LEFT,
//         children: [
//           new TextRun({
//             text: "SESSION REPORT",
//             bold: true,
//             color: "a52a2a",
//             size: 24,
//           }),
//         ],
//       })
//     );
//     children.push(
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: fdpData.summary || "Session report details go here...",
//             size: 24,
//           }),
//         ],
//       })
//     );

//     // Photos section: embed images if available + filename captions
//     children.push(new Paragraph({}));
//     children.push(
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: "GEO-TAGGED PHOTOS",
//             bold: true,
//             color: "a52a2a",
//             size: 24,
//           }),
//         ],
//       })
//     );

//     const photos = fdpData.geoTagPhotos || [];
//     // For docx we'll add each image + filename in sequence
//     for (let i = 0; i < photos.length; i++) {
//       const photo = photos[i];
//       let filepath = photo;
//       if (!fs.existsSync(filepath)) {
//         const tryPath = path.join(process.cwd(), "uploads", photo);
//         if (fs.existsSync(tryPath)) filepath = tryPath;
//         else filepath = null;
//       }
//       if (filepath && fs.existsSync(filepath)) {
//         const data = safeReadImage(filepath);
//         if (data) {
//           children.push(
//             new Paragraph({
//               children: [
//                 new ImageRun({
//                   data,
//                   transformation: { width: 360, height: 230 },
//                 }),
//               ],
//             })
//           );
//           children.push(new Paragraph({ children: [new TextRun(path.basename(filepath))] }));
//         } else {
//           children.push(new Paragraph({ children: [new TextRun(path.basename(photo))] }));
//         }
//       } else {
//         children.push(new Paragraph({ children: [new TextRun(path.basename(photo))] }));
//       }
//     }

//     // Resource Persons
//     children.push(new Paragraph({}));
//     children.push(
//       new Paragraph({
//         children: [
//           new TextRun({
//             text: "RESOURCE PERSON DETAILS",
//             bold: true,
//             color: "a52a2a",
//             size: 24,
//           }),
//         ],
//       })
//     );

//     const persons = fdpData.resourcePersons || [];
//     if (persons.length === 0) {
//       children.push(new Paragraph({ children: [new TextRun("No resource persons provided.")]}));
//     } else {
//       persons.forEach((p) => {
//         // If person has image
//         if (p.image) {
//           let imgPath = p.image;
//           if (!fs.existsSync(imgPath)) {
//             const tryPath = path.join(process.cwd(), "uploads", path.basename(p.image));
//             if (fs.existsSync(tryPath)) imgPath = tryPath;
//             else imgPath = null;
//           }
//           if (imgPath && fs.existsSync(imgPath)) {
//             const data = safeReadImage(imgPath);
//             if (data) {
//               children.push(
//                 new Paragraph({
//                   children: [
//                     new ImageRun({
//                       data,
//                       transformation: { width: 120, height: 120 },
//                     }),
//                   ],
//                 })
//               );
//             }
//           }
//         }

//         children.push(
//           createWordTable([
//             ["Name", p.name || ""],
//             ["Designation", p.designation || ""],
//             ["Institution", p.institution || ""],
//             ["Email", p.email || ""],
//             ["Phone Number", p.phone || ""],
//             ["Other Information", p.otherInformation || ""],
//           ])
//         );
//         children.push(new Paragraph({}));
//       });
//     }

//     // Create document with header-like first element using a 1-row table (logo-left, center text, logo-right)
//     const headerTable = new Table({
//       rows: [
//         new TableRow({
//           children: headerTableChildren,
//         }),
//       ],
//       width: { size: 100, type: "pct" },
//     });

//     // Footer
//     const footer = new Footer({
//       children: [
//         new Paragraph({
//           alignment: AlignmentType.CENTER,
//           children: [
//             new TextRun({
//               text: "Department of Computer Science and Engineering | Academic Year 2024–25",
//               size: 18,
//               color: "444444",
//             }),
//           ],
//         }),
//       ],
//     });

//     // Build document
//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           footers: { default: footer },
//           children: [headerTable, ...children],
//         },
//       ],
//     });

//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync(outputPath, buffer);
//     return outputPath;
//   } catch (err) {
//     throw err;
//   }
// };





import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  Footer,
  PageNumber
} from "docx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const leftLogo = path.join(__dirname, "../asserts/atria-logo.png");
const rightLogo = path.join(__dirname, "../asserts/atria-25years.png");

/* -------------------------------------------------------------------------- */
/* 🧩 Helper: Create Word Table                                               */
/* -------------------------------------------------------------------------- */
const createWordTable = (rows) => {
  return new Table({
    width: { size: 100, type: "pct" },
    rows: rows.map(
      ([label, value]) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 30, type: "pct" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      bold: true,
                      color: "a52a2a",
                      size: 24, // 12pt
                      font: "Times New Roman",
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 70, type: "pct" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: value || "",
                      size: 24, // 12pt
                      font: "Times New Roman",
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
    ),
  });
};

/* -------------------------------------------------------------------------- */
/* 🧾 1️⃣ Generate FDP Attended PDF                                           */
/* -------------------------------------------------------------------------- */
export const generateFDPAttendedPDF = (fdpData, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        bufferPages: true,
        size: "A4",
      });

      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      const pageWidth = doc.page.width;
      const margin = doc.page.margins.left;

      // ---------- HEADER: Logos ----------
      const headerY = 40;
      doc.image(leftLogo, margin, headerY, { width: 80 });
      doc.image(rightLogo, pageWidth - margin - 80, headerY, { width: 80 });

      // ---------- HEADINGS ----------
      doc.moveDown(3);
      doc
        .font("Times-Bold")
        .fontSize(18)
        .fillColor("#4B0082")
        .text("Department of Computer Science & Engineering", {
          align: "center",
        });

      doc.moveDown(0.5);
      doc
        .font("Times-Bold")
        .fontSize(16)
        .fillColor("#a52a2a")
        .text("ACTIVITY ATTENDED REPORT", {
          align: "center",
          underline: true,
        });

      // ---------- SUMMARY TABLE ----------
      doc.moveDown(2);
      const summaryData = [
        ["Activity Name", fdpData.activityName || ""],
        ["Coordinator(s)", fdpData.coordinator || ""],
        ["Date", fdpData.date || ""],
        ["Duration", fdpData.duration || ""],
        ["Venue", fdpData.venue || ""],
        ["POs/PSOs", fdpData.pos || ""],
      ];

      const startX = 80;
      let currentY = doc.y;
      const labelWidth = 160;
      const valueWidth = 350;

      summaryData.forEach(([label, value]) => {
        doc
          .font("Times-Bold")
          .fontSize(12)
          .fillColor("#a52a2a")
          .text(label, startX, currentY, { continued: true, width: labelWidth });
        doc
          .font("Times-Roman")
          .fontSize(12)
          .fillColor("black")
          .text(value, startX + labelWidth + 10, currentY);
        currentY += 22;
      });

      // ---------- INSTITUTION INFO AT PAGE END ----------
      const bottomY = doc.page.height - 120;
      doc
        .font("Times-Roman")
        .fontSize(10)
        .fillColor("#444444")
        .text(
          "ACADEMIC YEAR 2024-25\nATRIA INSTITUTE OF TECHNOLOGY,\nAdjacent Bangalore Baptist Hospital, Hebbal,\nBengaluru - 560 024.",
          0,
          bottomY,
          { align: "center" }
        );

      // ---------- FOOTER: PAGE NUMBER ----------
      const pageCount = doc.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        doc
          .font("Times-Roman")
          .fontSize(10)
          .fillColor("#444444")
          .text(`Page ${i + 1}`, 0, doc.page.height - 50, {
            align: "center",
          });
      }

      doc.end();
      stream.on("finish", () => resolve(outputPath));
    } catch (err) {
      reject(err);
    }
  });
};

/* -------------------------------------------------------------------------- */
/* 🧾 2️⃣ Generate FDP Attended Word (DOCX)                                   */
/* -------------------------------------------------------------------------- */
export const generateFDPAttendedTemplateWord = async (fdpData, outputPath) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Page ",
                    size: 18,
                    font: "Times New Roman",
                    color: "444444",
                  }),
                  PageNumber.CURRENT,
                ],
              }),
            ],
          }),
        },
        children: [
          // ---------- HEADER ----------
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Department of Computer Science & Engineering",
                bold: true,
                color: "4B0082",
                size: 36, // 18pt
                font: "Times New Roman",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "ACTIVITY ATTENDED REPORT",
                bold: true,
                underline: {},
                color: "a52a2a",
                size: 32, // 16pt
                font: "Times New Roman",
              }),
            ],
          }),

          // ---------- SUMMARY TABLE ----------
          createWordTable([
            ["Activity Name", fdpData.activityName || ""],
            ["Coordinator(s)", fdpData.coordinator || ""],
            ["Date", fdpData.date || ""],
            ["Duration", fdpData.duration || ""],
            ["Venue", fdpData.venue || ""],
            ["POs/PSOs", fdpData.pos || ""],
          ]),

          new Paragraph({ spacing: { before: 400 } }),

          // ---------- INSTITUTION INFO ----------
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text:
                  "ACADEMIC YEAR 2024-25\nATRIA INSTITUTE OF TECHNOLOGY,\nAdjacent Bangalore Baptist Hospital, Hebbal,\nBengaluru - 560 024.",
                font: "Times New Roman",
                size: 20,
                color: "444444",
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  return outputPath;
};
