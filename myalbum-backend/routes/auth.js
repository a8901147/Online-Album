const express = require("express");
const router = express.Router();

const Auth = require("../controllers/auth");

// User registration
router.post("/addUser", Auth.addUser);

// User login
router.post("/login", Auth.login);

module.exports = router;
