import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
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

    const images = aiResponse.data.images;
    if (images && images.length > 0) {
      const image = images[0].b64_json;
      res.status(200).json({ photo: image });
    } else {
      console.error("No image found in the response:", aiResponse);
      res.status(500).send("No image found in the response");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    res
      .status(500)
      .send(error?.response?.data?.error?.message || "Something went wrong");
  }
});

export default router;
