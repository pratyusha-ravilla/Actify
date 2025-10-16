

// server/src/models/FDPAttended.js

// import mongoose from "mongoose";

// const ResourcePersonSchema = new mongoose.Schema(
//   {
//     name: { type: String, default: "" },
//     designation: { type: String, default: "" },
//     institution: { type: String, default: "" },
//     email: { type: String, default: "" },
//     phone: { type: String, default: "" },
//   },
//   { _id: false }
// );

// const FDPAttendedSchema = new mongoose.Schema(
//   {
//     activityName: { type: String, required: true },  // ✅ replaces "title"
//     coordinator: { type: String, default: "" },       // ✅ for Prof. names
//     date: { type: String, required: true },           // ✅ event date
//     duration: { type: String, default: "" },          // ✅ e.g., "11.00 to 12.30 PM"
//     pos: { type: String, default: "" },               // ✅ PO & POs (e.g., "PO5")

//     // Optional or previously existing fields
//     summary: { type: String, default: "" },
//     toc: { type: String, default: "" },
//     brochure: { type: String, default: "" },
//     geoTagPhotos: [{ type: String }],
//     attendanceFile: { type: String, default: "" },
//     attendance: [{ type: String }],
//     resourcePersons: [ResourcePersonSchema],
//     feedback: { type: mongoose.Schema.Types.Mixed, default: {} },
//     createdBy: { type: String, default: "faculty" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("FDPAttended", FDPAttendedSchema);










import mongoose from "mongoose";

const ResourcePersonSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    designation: { type: String, default: "" },
    institution: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { _id: false }
);

const FDPAttendedSchema = new mongoose.Schema(
  {
    // 🔹 Summary Page Fields
    activityName: { type: String, required: true },
    coordinator: { type: String, default: "" },
    date: { type: String, required: true },
    duration: { type: String, default: "" },
    pos: { type: String, default: "" },

    // 🔹 Additional Report Sections
    summary: { type: String, default: "" }, // Session Report
    toc: { type: String, default: "" },
    brochure: { type: String, default: "" }, // Invitation/Poster
    geoTagPhotos: [{ type: String }], // Photos
    attendanceFile: { type: String, default: "" }, // Attendance
    attendance: [{ type: String }],
    resourcePersons: [ResourcePersonSchema],
    feedback: { type: mongoose.Schema.Types.Mixed, default: {} },

    // Metadata
    createdBy: { type: String, default: "faculty" },
  },
  { timestamps: true }
);

export default mongoose.model("FDPAttended", FDPAttendedSchema);
