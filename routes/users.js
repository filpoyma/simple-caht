const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { registerValidation, loginValidation } = require("../utils/validation");
const User = require("../models/User");
const tokensGenerate = require("../utils/tonkensGenerate");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const LOGOUT_TIME = process.env.LOGOUT_TIME;

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(400).json({ msg: "No users exist" });
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //Register validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  // Field validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    if (!savedUser)
      return res
        .status(400)
        .json({ msg: "Something went wrong saving the user" });

    const payload = {
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    };

    const { accessToken, refreshToken } = tokensGenerate(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      accessToken,
      user: payload.user,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Login validation
  // const { error } = loginValidation(req.body);
  // if (error) return res.status(400).json({ msg: error.details[0].message });

  // Field validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ msg: "Invalid credentials" });

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
    const { accessToken, refreshToken } = tokensGenerate(payload);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      accessToken,
      user: payload.user,
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.get("/logout", auth, async (req, res) => {
  res.clearCookie("refreshToken");
  res.end();
});

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    res.json(user);
  } catch (e) {
    console.log("Get user Err:", e);
    res.status(400).json({ msg: e.message });
  }
});

router.get("/checkauth", auth, (req, res, next) => {
  res.status(200).json({ user: req.user });
});

router.post("/refresh", (req, res) => {
  if (!req.cookies?.refreshToken)
    return res.status(406).json({ message: "Unauthorized" });

  try {
    const decodedRT = jwt.verify(
      req.cookies.refreshToken,
      REFRESH_TOKEN_SECRET
    );
    const decodeAT = jwt.verify(req.body.accessToken, ACCESS_TOKEN_SECRET);
    const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
    console.log(
      "file-users.js payload.exp - nowUnixSeconds > 60:",
      decodeAT.exp - nowUnixSeconds
    );

    const accessToken = jwt.sign(
      {
        username: decodedRT.user.name,
        email: decodedRT.user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: LOGOUT_TIME,
      }
    );
    return res.json({ accessToken });
  } catch (e) {
    console.log("jwt veryfy error", e.message);
    res.clearCookie("refreshToken");
    return res.end();
  }
});

module.exports = router;
