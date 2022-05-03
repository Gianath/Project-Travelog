const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Model
const userModel = require("../models/user");

const getCurrentUser = async (req, res) => {
  const { username, email, bio, postCreated, postLiked } =
    await userModel.findOne({
      _id: req.userID,
    });

  res.json({ username, email, bio, postCreated, postLiked });
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

    console.log("Successfully sent!\n", resp);
    res.json({ status: "success" });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use!" });
    }
    return res.json({ status: "failed" });
  }
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
  registerUser,
  checkCredentials,
  getCurrentUser,
};
