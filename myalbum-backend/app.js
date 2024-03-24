const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to handle URL encoded data
app.use(bodyParser.urlencoded({ extended: true }));

const uploadInfo = require("./util/uploadInfo");
app.use(
  multer({
    storage: uploadInfo.fileStorage,
    fileFilter: uploadInfo.fileFilter,
  }).single("image")
);

app.get("/", (req, res, next) => {
  res.send("This is entry");
});

const protectedRoute = require("./routes/protected");
const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");
app.use(uploadRoutes);
app.use(authRoutes);
app.use(protectedRoute);

//require("dotenv").config();
const rawPassword = process.env.DB_PASS;
const encodedPassword = encodeURIComponent(rawPassword);
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${encodedPassword}@cluster1.5ybk5km.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

// public: qtogqqrh
// private: 4db9f523-7e30-4e6a-8b82-540c4a6b2439
