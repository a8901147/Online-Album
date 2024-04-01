// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  const Bearer = req.headers["authorization"];

  if (!Bearer) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  // Remove Bearer from token string
  const token = Bearer.split(" ")[1];

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "your-secret-key");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  // Validate the user exists and is active
  const _id = decodedToken.userId;
  await User.findById({ _id }).then((user) => {
    if (!user) {
      const error = new Error("User does not exist or is not active.");
      error.statusCode = 401; // Or another appropriate status code
      throw error;
    }
  });

  req._id = decodedToken.userId;
  next();
};

module.exports = verifyToken;
