const express = require("express");
const upload = require("../controllers/upload");
const multer = require("multer");
const router = express.Router();
const uploadInfo = require("../util/uploadInfo");
const verifyToken = require("../middleware/authMiddleware");

router.post(
  "/uploadImage",
  verifyToken,
  multer({
    storage: uploadInfo.fileStorage,
    fileFilter: uploadInfo.fileFilter,
  }).single("image"),
  upload.uploadImage
);
module.exports = router;
