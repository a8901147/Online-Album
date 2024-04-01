// routes/protectedRoute.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const ProtectedController = require("../controllers/protected");

// Protected route
router.get("/protected", verifyToken, ProtectedController.protected);
router.get("/getGallery", verifyToken, ProtectedController.getGallery);

module.exports = router;
