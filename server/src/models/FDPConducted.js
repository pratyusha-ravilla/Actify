// import mongoose from "mongoose";

// const fdpConductedSchema = new mongoose.Schema({
//   programName: { type: String, required: true },
//   date: { type: Date, required: true },
//   venue: { type: String, required: true },
//   participants: { type: Number, required: true },
// });

// export default mongoose.model("FDPConducted", fdpConductedSchema);




import mongoose from "mongoose";

const ResourcePersonSchema = new mongoose.Schema({
  name: String,
  designation: String,
  institution: String,
  email: String,
  phone: String
}, { _id: false });

const FDPConductedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, default: "" },
  toc: { type: String, default: "" },
  brochure: { type: String, default: "" },
  resourcePersons: [ResourcePersonSchema],
  geoTagPhotos: [String],
  attendanceFile: { type: String, default: "" },
  feedback: { type: mongoose.Schema.Types.Mixed, default: {} },
  createdBy: { type: String, default: "faculty" }
}, { timestamps: true });

export default mongoose.model("FDPConducted", FDPConductedSchema);
