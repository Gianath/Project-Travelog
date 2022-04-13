const path = require("path");
const bcrypt = require("bcrypt");

// User Model
const userModel = require("../models/user");

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "login.html"));
};

const checkCredentials = async (req, res) => {
  const { email, password } = req.body;

  try {
    const resp = await userModel.findOne({
      email: email,
    });
    bcrypt.compare(password, resp.password, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result) {
        console.log("Succesfully login!\n", resp);
        res.json({ status: "ok", body: req.body });
      } else if (!result) {
        console.log("Failed login!\n", resp);
        res.json({ status: "Failed", body: req.body });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: "failed" });
  }
};

module.exports = {
  getLoginPage,
  checkCredentials,
};
