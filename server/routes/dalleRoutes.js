import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

router.get("/", (req, res) => {
  res.send("Hello");
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    if (
      aiResponse.data &&
      aiResponse.data.data &&
      aiResponse.data.data.length > 0
    ) {
      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } else {
      console.error("Unexpected or empty response:", aiResponse);
      res
        .status(500)
        .send("Unexpected or empty response from image generation");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).send("An error occurred while generating image");
  }
});

export default router;
