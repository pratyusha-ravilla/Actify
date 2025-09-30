// import mongoose from "mongoose";

// const ResourcePersonSchema = new mongoose.Schema({
//   name: String,
//   designation: String,
//   institution: String,
//   email: String,
//   phone: String
// }, { _id: false });

// const FDPAttendedSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   summary: { type: String, default: "" },
//   toc: { type: String, default: "" },
//   brochure: { type: String, default: "" },
//   resourcePersons: [ResourcePersonSchema],
//   geoTagPhotos: [String],
//   attendanceFile: { type: String, default: "" },
//   feedback: { type: mongoose.Schema.Types.Mixed, default: {} },
//   createdBy: { type: String, default: "faculty" }
// }, { timestamps: true });

// export default mongoose.model("FDPAttended", FDPAttendedSchema);



// import mongoose from "mongoose";

// // Sub-schema for resource persons
// const ResourcePersonSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     designation: { type: String, default: "" },
//     institution: { type: String, default: "" },
//     email: { type: String, default: "" },
//     phone: { type: String, default: "" },
//   },
//   { _id: false }
// );

// // Main FDP Attended schema
// const FDPAttendedSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },   // required
//     summary: { type: String, default: "" },
//     toc: { type: String, default: "" },

//     // File-like fields will only store string paths or URLs
//     brochure: { type: String, default: "" },
//     geoTagPhotos: [{ type: String }],          // array of file paths / URLs
//     attendanceFile: { type: String, default: "" },

//     // Array of resource persons
//     resourcePersons: [ResourcePersonSchema],

//     // Feedback can be structured or free text → keep as Mixed
//     feedback: { type: mongoose.Schema.Types.Mixed, default: {} },

//     createdBy: { type: String, default: "faculty" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("FDPAttended", FDPAttendedSchema);







import mongoose from "mongoose";

// Sub-schema for resource persons
const ResourcePersonSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },   // made optional
    designation: { type: String, default: "" },
    institution: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { _id: false }
);

// Main FDP Attended schema
const FDPAttendedSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },   // required
    summary: { type: String, default: "" },
    toc: { type: String, default: "" },

    // File-like fields will only store string paths or URLs
    brochure: { type: String, default: "" },
    geoTagPhotos: [{ type: String }],          // array of file paths / URLs
    attendanceFile: { type: String, default: "" },

    // Array of resource persons
    resourcePersons: [ResourcePersonSchema],

    // Feedback can be structured or free text → keep as Mixed
    feedback: { type: mongoose.Schema.Types.Mixed, default: {} },

    createdBy: { type: String, default: "faculty" },
  },
  { timestamps: true }
);

export default mongoose.model("FDPAttended", FDPAttendedSchema);
