const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../Models/User");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ userName: username });
  if (user) {
    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          const accessToken = jwt.sign(
            { username: username, password: password },
            "importantSecret"
          );
          res.json(accessToken, username, password);
        } else {
          res.json("Incorrect Password");
        }
      })
      .catch((e) => {
        res.status(501).json(e);
      });
  } else {
    res.status(501).json({ message: "User Not Found" });
  }
});

module.exports = router;
