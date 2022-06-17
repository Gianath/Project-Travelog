const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User Model
const userModel = require("../models/user");

// Post Model
const postModel = require("../models/post");

const getCurrentUser = async (req, res) => {
  const { username, email, bio, postCreated, postLiked, likedPostID } =
    await userModel
      .findOne({
        _id: req.userID,
      })
      .populate({
        path: "likedPostID",
        populate: {
          path: "authorID",
          model: "User",
        },
      });

  res.json({
    status: "success",
    username,
    email,
    bio,
    postCreated,
    postLiked,
    likedPostID,
  });
};

const logoutCurrentUser = async (req, res) => {
  try {
    console.log("logged out");
    res
      .clearCookie("authToken")
      .json({ status: "success", msg: "successfully logout" });
  } catch (error) {
    console.log(error);
  }
};

const updateUserProfile = async (req, res) => {
  const { username, email, password, bio } = req.body;
  var hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const resp = await userModel.findOneAndUpdate(
      { _id: req.userID },
      {
        username,
        email,
        password: hashedPassword,
        bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!resp) {
      res.json({ status: "failed", error: "not found" });
    }
    res.json({
      status: "Success",
      username: resp.username,
      email: resp.email,
      bio: resp.bio,
      postCreated: resp.postCreated,
      postLiked: resp.postLiked,
    });
  } catch (error) {
    res.json({ status: "failed", error });
    console.log(error);
  }
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
            expiresIn: "600s",
          }
        );
        res
          .cookie("authToken", token, {
            httpOnly: true,
            // secure: true,
            sameSite: "strict",
          })
          .json({ status: "success", body: req.body });
        console.log("Successfully login!\n", resp);
      } else if (!result) {
        console.log("Failed login!\n", resp);
        res.clearCookie("authToken").json({ status: "failed", body: req.body });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: "failed" });
  }
};

const checkLike = async (req, res) => {
  try {
    const { postID } = req.body;
    const userID = req.userID;
    const resp = await userModel.find({
      _id: userID,
      likedPostID: postID,
    });
    res.json({ status: "success", results: resp });
  } catch (error) {
    console.log(error);
  }
};

const updateLike = async (req, res) => {
  try {
    const { postID } = req.body;
    const userID = req.userID;
    var resp = await userModel.findOneAndUpdate(
      {
        _id: userID,
        likedPostID: { $ne: postID },
      },
      {
        $inc: { postLiked: 1 },
        $push: { likedPostID: postID },
      }
    );

    if (resp == null) {
      var resp = await userModel.findOneAndUpdate(
        {
          _id: userID,
          likedPostID: postID,
        },
        {
          $inc: { postLiked: -1 },
          $pull: { likedPostID: postID },
        }
      );

      var resp2 = await postModel.findOneAndUpdate(
        {
          _id: postID,
        },
        {
          $inc: { likes: -1 },
        }
      );
    } else {
      var resp2 = await postModel.findOneAndUpdate(
        {
          _id: postID,
        },
        {
          $inc: { likes: 1 },
        }
      );
    }

    res.json({ status: "success", results: [resp, resp2] });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  checkCredentials,
  getCurrentUser,
  updateUserProfile,
  logoutCurrentUser,
  checkLike,
  updateLike,
};
