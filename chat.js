import express from "express";
import { validateSafety } from "./safetyService.js";
import { processQuery } from "./geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { query, mode } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query parameters missing." });
    }

    const safetyResult = validateSafety(query);
    if (!safetyResult.safe) {
      return res.json({
        text: safetyResult.reason,
        badge: "Safety Alert",
        sources: []
      });
    }

    const response = await processQuery(query, mode || "GLOBAL_WEB");
    return res.json(response);

  } catch (error) {
    console.error("OS Brain Engine Error:", error);
    return res.status(500).json({ error: "OS Brain processing engine encountered an issue." });
  }
});

export default router;
