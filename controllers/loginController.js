const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    if (!resp) {
      return res.json({ status: "Failed", body: req.body });
    }
    bcrypt.compare(password, resp.password, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result) {
        const token = jwt.sign(
          { id: resp._id, username: resp.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "300s",
          }
        );
        res
          .cookie("authToken", token, {
            httpOnly: true,
          })
          .json({ status: "success", body: req.body });
        console.log("Succesfully login!\n", resp);
      } else if (!result) {
        console.log("Failed login!\n", resp);
        res.clearCookie("authToken").json({ status: "Failed", body: req.body });
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
