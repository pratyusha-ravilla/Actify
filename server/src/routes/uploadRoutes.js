// import express from "express";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/attendance"); // folder where files will be saved
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

// // Upload attendance file
// router.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: "No file uploaded" });
//   }

//   res.json({
//     message: "File uploaded successfully",
//     filePath: `/uploads/attendance/${req.file.filename}`,
//   });
// });

// export default router;
