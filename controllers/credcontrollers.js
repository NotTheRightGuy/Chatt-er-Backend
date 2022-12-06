const cred = require("../Models/creds.model");
const asyncHandler = require("express-async-handler");

// @desc Create a new user
// @route POST /api/creds
// @access Public

const createCreds = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  const duplicate = await cred.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const user = await cred.create({ email, username, password });
  if (!user) {
    return res.status(400).json({ message: "User not created" });
  }
  user.save();
  console.log(`User ${username} created`);
  res.status(201).json({ message: "User created" });
});

// @desc    Get a user
// @route   GET /api/creds/:username
// @access  Public

const getCred = asyncHandler(async (req, res) => {
  const { username } = req.query;
  if (!username) {
    const users = await cred.find({}).select("-password -_id").lean();
    if (!users?.length) {
      return res.json({ message: "No users found" });
    }
    res.status(200).json(users);
  } else {
    const user = await cred.findOne({ username }).select(" -_id").lean();
    if (!user) {
      return res.json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
});

module.exports = { createCreds, getCred };
