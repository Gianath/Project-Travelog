const postModel = require("../models/post");

const createPost = async (req, res) => {
  try {
    const { title, content, country } = req.body;
    const userID = req.userID;
    const resp = await postModel.create({
      authorID: userID,
      title: title,
      content: content,
      country: country,
    });

    res.json({ status: "success", msg: resp });
  } catch (error) {
    console.log(error);
  }
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

const getPostByID = async (req, res) => {
  try {
    const result = await postModel.findOne({
      _id: req.params.id,
    });
    res.json({ status: "success", results: result });
  } catch (error) {
    res.json({ status: "failed", msg: error });
  }
};

module.exports = {
  createPost,
  getPostByView,
  getPostByLike,
  getPostByID,
};
