import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();
// used to uplaod images
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// get routes
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(200).json({ success: false, message: error });
  }
});
// create a post - used to uplaod
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    // creates post in Db
    const newPost = await Post.create({
      name,
      prompt,
      photoUrl,
    });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
});

export default router;
