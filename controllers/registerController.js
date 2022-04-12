const path = require("path");

// User Model
const UserSchema = require("../models/user");

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"));
};

const registerUser = async (req, res) => {
  console.log(req.body);
  res.json({ status: "success" });
};

module.exports = {
  getRegisterPage,
  registerUser,
};
