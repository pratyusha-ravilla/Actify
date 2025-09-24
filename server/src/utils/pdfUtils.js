import PDFDocument from "pdfkit";
import fs from "fs";

export const generatePDF = (data, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("Report", { align: "center" });
  doc.moveDown();

  Object.entries(data.toObject()).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key}: ${value}`);
  });

  doc.end();
};
