import mongoose from "mongoose";

const expertTalkSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  speaker: { type: String, required: true },
  date: { type: Date, required: true },
  audience: { type: Number, required: true },
});

export default mongoose.model("ExpertTalk", expertTalkSchema);
