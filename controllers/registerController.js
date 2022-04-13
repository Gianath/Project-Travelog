const path = require("path");
const bcrypt = require("bcrypt");

// User Model
const userModel = require("../models/user");

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"));
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const resp = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log("Succesfully sent!\n", resp);
    res.json({ status: "success" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use!" });
    }
    return res.json({ status: "failed" });
  }
};

module.exports = {
  getRegisterPage,
  registerUser,
};
