import express from "express";
import { validateSafety } from "../services/safetyService.js";
import { processQuery } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query, mode } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query parameters missing." });
    }

    // 1. Safety Check
    const safetyResult = validateSafety(query);
    if (!safetyResult.safe) {
      return res.json({
        text: safetyResult.reason,
        badge: "Safety Alert",
        sources: []
      });
    }

    // 2. Process Request based on Mode
    const response = await processQuery(query, mode || "GLOBAL_WEB");
    return res.json(response);

  } catch (error) {
    console.error("OS Brain Engine Error:", error);
    return res.status(500).json({ error: "OS Brain processing engine encountered an issue." });
  }
});

export default router;
