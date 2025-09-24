import mongoose from "mongoose";

const fdpConductedSchema = new mongoose.Schema({
  programName: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  participants: { type: Number, required: true },
});

export default mongoose.model("FDPConducted", fdpConductedSchema);
