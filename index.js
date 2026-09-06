import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Main Chat Route API Endpoint
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("OS Brain AI Server is Running Live!");
});

app.listen(PORT, () => {
  console.log(`OS Brain Server running on port ${PORT}`);
});
