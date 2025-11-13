

//server/src/routes/templateRoutes.js

import express from "express";
import { saveTemplate } from "../controllers/templateController.js";

const router = express.Router();

// POST route to save FDP template
router.post("/saveFDPServer", saveTemplate);

export default router;
