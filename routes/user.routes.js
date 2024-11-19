const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

router.get("/register", (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 10 }),
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "invalid data",
      });
      const { username, email, password } = req.body;
      const newUser = await userModel.create({
        username,
        email,
        password,
      });
      res.json(newUser);
    }
  }
);
router.get("/login", (req, res) => {
  res.render("login");
});
router.post(
  "/logn",
  body("password").trim().isLength({ min: 5 }),
  body("username").trim().isLength({ min: 3 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid Data",
      });
    }
    const { username, password } = req.body;
    const user = await userModel.findOne({
      username: username,
    });
    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }
    const isMatch = await user.compare(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: email.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    res.cookie("token", token);
    res.send("logged In");
  }
);
module.exports = router;
