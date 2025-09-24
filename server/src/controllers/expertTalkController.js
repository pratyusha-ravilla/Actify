import ExpertTalk from "../models/ExpertTalk.js";
import { generatePDF } from "../utils/pdfUtils.js";
import path from "path";

export const createExpertTalk = async (req, res) => {
  try {
    const talk = new ExpertTalk(req.body);
    await talk.save();
    res.status(201).json(talk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getExpertTalks = async (req, res) => {
  try {
    const talks = await ExpertTalk.find();
    res.json(talks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const generateExpertTalkReport = async (req, res) => {
  try {
    const talk = await ExpertTalk.findById(req.params.id);
    if (!talk) return res.status(404).json({ message: "Not found" });

    const filePath = path.join("reports", `expert_talk_${talk._id}.pdf`);
    generatePDF(talk, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
