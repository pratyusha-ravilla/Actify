


// server/utils/fileUtils.js
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const generatePDF = async (data, filePath) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  let y = height - 50;

  const addText = (title, content) => {
    page.drawText(title, { x: 50, y, size: fontSize + 2, font, color: rgb(0, 0, 0) });
    y -= 20;
    page.drawText(content || "-", { x: 60, y, size: fontSize, font, color: rgb(0, 0, 0) });
    y -= 30;
  };

  addText("Title:", data.title);
  addText("Summary:", data.summary);
  addText("TOC:", data.toc);
  addText("Brochure:", data.brochure);
  addText("Feedback:", JSON.stringify(data.feedback, null, 2));

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(filePath, pdfBytes);
};

export const generateWord = async (data, filePath) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({ text: "Title:", spacing: { after: 200 } }),
          new Paragraph({ text: data.title || "-", spacing: { after: 200 } }),
          new Paragraph({ text: "Summary:", spacing: { after: 200 } }),
          new Paragraph({ text: data.summary || "-", spacing: { after: 200 } }),
          new Paragraph({ text: "TOC:", spacing: { after: 200 } }),
          new Paragraph({ text: data.toc || "-", spacing: { after: 200 } }),
          new Paragraph({ text: "Brochure:", spacing: { after: 200 } }),
          new Paragraph({ text: data.brochure || "-", spacing: { after: 200 } }),
          new Paragraph({ text: "Feedback:", spacing: { after: 200 } }),
          new Paragraph({ text: JSON.stringify(data.feedback, null, 2) }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
};
