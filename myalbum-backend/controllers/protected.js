const User = require("../models/user");

exports.protected = async (req, res, next) => {
  res.status(200).json({ message: "JWT matched" });
};

exports.getGallery = (req, res, next) => {
  const _id = req._id;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        const error = new Error("User does not exist or is not active.");
        error.statusCode = 401; // Or another appropriate status code
        throw error;
      }
      return user;
    })
    .then((user) => {
      return res.status(200).json({ pictures: user.pictures });
    });
};
