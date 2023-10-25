const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const UserModel = require("../Models/User");

router.post("/", async (req, res) => {
  const userData = req.body;
  const findUser = await UserModel.findOne({ userName: userData.userName });
  if (findUser) {
    res.status(501).json({ message: "User already exists,Please Try again" });
  } else {
    await bcrypt.hash(userData.password, 10).then((hash) => {
      userData.password = hash;
    });
    const user = new UserModel(userData);
    user
      .save()
      .then(() => {
        res.status(201).json("Registered Sucessfull Please Login");
      })
      .catch((e) => {
        res.status(501).json(e);
      });
  }
});

module.exports = router;
