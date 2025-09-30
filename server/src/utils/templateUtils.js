// server/src/utils/templateUtils.js
import fs from "fs";
import PDFDocument from "pdfkit";

import { Document, Packer, Paragraph, TextRun } from "docx";

// ---------------- FDP Attended ----------------
export const generateFDPAttendedPDF = async (fdp, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text(`FDP Attended Report`, { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Title: ${fdp.title}`);
  doc.text(`Summary: ${fdp.summary}`);
  doc.text(`TOC: ${fdp.toc}`);
  doc.end();
};

export const generateFDPAttendedWord = async (fdp, filePath) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: "FDP Attended Report", bold: true, size: 28 })],
          }),
          new Paragraph(`Title: ${fdp.title}`),
          new Paragraph(`Summary: ${fdp.summary}`),
          new Paragraph(`TOC: ${fdp.toc}`),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
};

// ---------------- FDP Conducted ----------------
export const generateFDPConductedPDF = async (fdp, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text(`FDP Conducted Report`, { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Title: ${fdp.title}`);
  doc.text(`Summary: ${fdp.summary}`);
  doc.text(`TOC: ${fdp.toc}`);
  doc.end();
};

export const generateFDPConductedWord = async (fdp, filePath) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: "FDP Conducted Report", bold: true, size: 28 })],
          }),
          new Paragraph(`Title: ${fdp.title}`),
          new Paragraph(`Summary: ${fdp.summary}`),
          new Paragraph(`TOC: ${fdp.toc}`),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
};

// ---------------- Expert Talk ----------------
export const generateExpertTalkPDF = async (talk, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text(`Expert Talk Report`, { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`Title: ${talk.title}`);
  doc.text(`Summary: ${talk.summary}`);
  doc.text(`TOC: ${talk.toc}`);
  doc.end();
};

export const generateExpertTalkWord = async (talk, filePath) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Expert Talk Report", bold: true, size: 28 })],
          }),
          new Paragraph(`Title: ${talk.title}`),
          new Paragraph(`Summary: ${talk.summary}`),
          new Paragraph(`TOC: ${talk.toc}`),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
};
