exports.protected = (req, res, next) => {
  res.status(200).json({ message: "Protected route accessed" });
};
