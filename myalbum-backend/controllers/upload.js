const root = require("../util/path");
const fs = require("fs");
const path = require("path");

// POST endpoint to receive the image
exports.uploadImage = (req, res, next) => {
  // multer has already saved the file at this point, and you can access it via req.file
  if (!req.file) {
    return res.status(400).send("No image provided");
  }

  // At this point, the file has been saved successfully by multer, so you can proceed
  // with any additional processing or simply respond to the client.

  // Responding to the client that the file has been received and processed.
  return res.status(200).send("Image received and processed.");
};
