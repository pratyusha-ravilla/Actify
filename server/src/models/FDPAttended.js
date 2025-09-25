// import mongoose from "mongoose";

// const fdpAttendedSchema = new mongoose.Schema({
//   facultyName: { type: String, required: true },
//   programName: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   organization: { type: String, required: true },
// });

// export default mongoose.model("FDPAttended", fdpAttendedSchema);




import mongoose from "mongoose";

const ResourcePersonSchema = new mongoose.Schema({
  name: String,
  designation: String,
  institution: String,
  email: String,
  phone: String
}, { _id: false });

const FDPAttendedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, default: "" },
  toc: { type: String, default: "" },
  brochure: { type: String, default: "" }, // File path or URL
  resourcePersons: [ResourcePersonSchema],
  geoTagPhotos: [String], // File paths
  attendanceFile: { type: String, default: "" }, // File path (CSV/Excel)
  feedback: { type: mongoose.Schema.Types.Mixed, default: {} }, // Ratings & comments
  createdBy: { type: String, default: "faculty" }
}, { timestamps: true });

export default mongoose.model("FDPAttended", FDPAttendedSchema);
