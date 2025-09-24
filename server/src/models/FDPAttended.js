import mongoose from "mongoose";

const fdpAttendedSchema = new mongoose.Schema({
  facultyName: { type: String, required: true },
  programName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  organization: { type: String, required: true },
});

export default mongoose.model("FDPAttended", fdpAttendedSchema);
