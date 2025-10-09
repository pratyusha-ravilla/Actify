//server/src/models/FDPAttended.js

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

// const FDPAttendedSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     summary: { type: String, default: "" },
//     toc: { type: String, default: "" },
//     brochure: { type: String, default: "" },
//     geoTagPhotos: [{ type: String }],
//     attendanceFile: { type: String, default: "" },
//     resourcePersons: [ResourcePersonSchema],
//     feedback: { type: mongoose.Schema.Types.Mixed, default: {} },
//     createdBy: { type: String, default: "faculty" },
//   },
//   { timestamps: true }
// );

const FDPAttendedSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, default: "" },
    toc: { type: String, default: "" },
    brochure: { type: String, default: "" },
    geoTagPhotos: [{ type: String }],
    attendanceFile: { type: String, default: "" },
    attendance: [{ type: String }], // ✅ add this
    resourcePersons: [ResourcePersonSchema],
    feedback: { type: mongoose.Schema.Types.Mixed, default: {} },
    createdBy: { type: String, default: "faculty" },
  },
  { timestamps: true }
);



export default mongoose.model("FDPAttended", FDPAttendedSchema);
