import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello");
});

router.route("/generate").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export default router;
