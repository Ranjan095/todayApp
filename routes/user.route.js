/** @format */

const express = require("express");
userRoute = express.Router();
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRoute.post("/register", async (req, res) => {
  let { name, email, password, age, city } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const user = new UserModel({ name, email, age, city, password: hash });
        await user.save();
        res.status(200).send({ msg: "new user has been added" });
      }
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ authorId: user._id,author:user.name }, "react");
        res.status(200).send({ msg: "login Sucessful", token });
      } else {
        res.status(200).send({ msg: "wrong credentials" });
      }
    });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { userRoute };
