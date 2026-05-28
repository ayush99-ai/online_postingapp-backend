const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

// create post
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "error creating post" });
  }
});

// get posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "error fetching posts" });
  }
});

module.exports = router;