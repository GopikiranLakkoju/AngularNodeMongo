const express = require("express");
const router = express.Router();

const Post = require("../models/post");

// get
router.get("", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts,
    });
    return posts;
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

// insert
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    context: req.body.context,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "post added successfully",
      postId: result._id,
    });
  });
});

// update
router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    context: req.body.context,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

// delete
router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
    })
    .catch((e) => {
      console.log("Error while deleting!");
    });
  res.status(200).json({
    message: "Post deleted!",
  });
});

module.exports = router;
