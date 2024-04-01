const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.addUser = (req, res, next) => {
  const { email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash_password) => {
      const user = new User({
        email: email,
        password: hash_password,
      });

      user
        .save()
        .then(() => {
          return res.json({ message: "add new account succefully" });
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
  const { email, password } = req.body;
  let userFound; // Declare variable in a higher scope
  console.log("someone try to loggin");
  User.findOne({ email })
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
      console.log(passwordMatch);
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ error: "Authentication failed: password failed" });
      }
      const accessToken = jwt.sign(
        { userId: userFound._id },
        "your-secret-key",
        {
          expiresIn: "1h",
        }
      );
      console.log(accessToken);

      return res
        .status(200)
        .json({ message: "Login success", jwt: accessToken });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: "Login failed" });
    });
};
