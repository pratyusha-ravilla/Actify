// server/src/routes/fdpTemplateRoute.js
import express from "express";
import {
  getFDPTemplate,
  downloadFDPTemplatePDF,
  downloadFDPTemplateWord,
} from "../controllers/fdpTemplateController.js";

const router = express.Router();

// GET base (blank) template for "View Template" preview
router.get("/fdp-attended/template", getFDPTemplate);

// GET generated files for saved FDP record
router.get("/fdp-attended/:id/pdf", downloadFDPTemplatePDF);
router.get("/fdp-attended/:id/word", downloadFDPTemplateWord);

export default router;
