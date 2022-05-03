const postModel = require("../models/post");

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
  getPostByView,
  getPostByLike,
};
