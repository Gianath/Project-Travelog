const path = require("path");
const jwt = require("jsonwebtoken");

const postModel = require("../models/post");

const getDashboardPage = async () => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "dashboard.html"));
};

const getCurrentUser = async (req, res) => {
  res.json({ userID: req.userID, username: req.username });
};

const getPostByView = async (req, res) => {
  try {
    const result = await postModel.find().sort({ views: "desc" });
    res.json({ status: "success", results: result });
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", msg: error });
  }
};

const getPostByLike = async (req, res) => {
  try {
    const result = await postModel.find().sort({ likes: "desc" });
    res.json({ status: "success", results: result });
  } catch (error) {
    res.json({ status: "failed", msg: error });
  }
};
module.exports = {
  getDashboardPage,
  getCurrentUser,
  getPostByView,
  getPostByLike,
};
