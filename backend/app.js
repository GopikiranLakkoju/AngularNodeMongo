const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mangoose = require("mongoose");

const Post = require("./models/post");

const app = express();

// database connection to mongodb
mangoose
  .connect(
    "mongodb+srv://Gopikiran:deepika@cluster0.ye1tx6c.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// morgan for logging
app.use(morgan("dev"));

// enable CORS
app.use(cors());

// get
app.get("/api/posts", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: posts,
    });
    return posts;
  });
});

// insert
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    context: req.body.context,
  });
  post.save().then((result) => {
    res.status(201).json({
      message: "post added successfully",
      postId: result._id
    });
  });
});

// delete
app.delete("/api/posts/:id", (req, res, next) => {
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

module.exports = app;
