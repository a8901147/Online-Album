const express = require("express");
const upload = require("../controllers/upload");

const router = express.Router();

router.post("/uploadImage", upload.uploadImage);
module.exports = router;
