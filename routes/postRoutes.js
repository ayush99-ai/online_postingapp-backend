const express = require("express");

const router = express.Router();

const Post = require("../models/Post");

// Create Post
router.post("/", async (req, res) => {
  try {
    const { title, content, user } = req.body;

    if (!title || !content || !user) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const newPost = await Post.create({
      title,
      content,
      user,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Get All Posts With User Details
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user");

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch posts",
    });
  }
});

module.exports = router;