import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import chatRouter from "./chat.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

app.listen(PORT, () => {
  console.log(`OS Brain Server running on port ${PORT}`);
});
