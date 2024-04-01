const multer = require("multer");
const root = require("../util/path");
exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, root + "/images");
  },
  filename: (req, file, cb) => {
    //cb(null, req._id + new Date().toISOString() + "-" + file.originalname);
    const filename = req._id + "-" + file.originalname;
    cb(null, filename);
    req.filename = filename;
  },
});

exports.fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
