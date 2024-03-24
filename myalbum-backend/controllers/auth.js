const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.addUser = (req, res, next) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash_password) => {
      const user = new User({ username: username, password: hash_password });

      user
        .save()
        .then(() => {
          return res.json({ message: "add user succefully" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "Registration failed" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: "bcrypt failed" });
    });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  let userFound; // Declare variable in a higher scope

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Authentication failed: no user" });
      }
      userFound = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passwordMatch) => {
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Authentication failed: password failed" });
      }
      const token = jwt.sign({ userId: userFound._id }, "your-secret-key", {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Login failed" });
    });
};
