// models/User.js
const mongoose = require("mongoose");
// Define a sub-schema for pictures
const pictureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  pictures: [pictureSchema],
});

module.exports = mongoose.model("User", userSchema);
