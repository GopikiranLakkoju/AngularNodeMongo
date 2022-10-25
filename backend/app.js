const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mangoose = require("mongoose");

const postRoutes = require('./routes/posts');

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

// use posts
app.use('/api/posts', postRoutes);

module.exports = app;
