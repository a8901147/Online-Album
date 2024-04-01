const root = require("../util/path");
const fs = require("fs");
const path = require("path");
const imageSize = require("image-size");
const User = require("../models/user");

// POST endpoint to receive the image
exports.uploadImage = async (req, res, next) => {
  // multer has already saved the file at this point, and you can access it via req.file
  if (!req.file) {
    return res.status(400).send("No image provided");
  }
  const dimensions = imageSize(req.file.path);

  // At this point, the file has been saved successfully by multer, so you can proceed
  // with any additional processing or simply respond to the client.

  // Responding to the client that the file has been received and processed.
  User.findById(req._id)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      const existingPictureIndex = user.pictures.findIndex(
        (p) => p.name === req.filename
      );
      if (existingPictureIndex === -1) {
        // Pushing to the user's pictures array, not User.pictures
        user.pictures.push({
          name: req.filename,
          width: dimensions.width,
          height: dimensions.height,
        });
        // Return the save operation as a promise
        return user.save();
      } else {
        // If the picture already exists, respond and stop the chain
        res.json({ message: "Image already existed" });
        return null; // Return null to break the promise chain
      }
    })
    .then((user) => {
      // If user is null, the chain was broken intentionally, do nothing
      if (user) {
        // Success, `user` is the updated document
        res.status(200).send("Image received and processed.");
      }
    })
    .catch((err) => {
      // Handle error
      console.error(err);
      res.status(500).send(err.message);
    });
};
