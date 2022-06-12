const postModel = require("../models/post");

const createPost = async (req, res) => {
  try {
    const { title, content, country, date } = req.body;
    const userID = req.userID;
    const resp = await postModel.create({
      authorID: userID,
      title: title,
      content: content,
      country: country,
      date: date,
    });

    res.json({ status: "success", msg: resp });
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content, country, commentID } = req.body;
    const resp = await postModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        content,
        country,
        $push: { commentIDs: commentID },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({ status: "success", msg: resp });
  } catch (error) {
    console.log(error);
  }
};

const getPostByView = async (req, res) => {
  try {
    const result = await postModel
      .find()
      .sort({ views: "desc" })
      .populate("authorID");
    res.json({ status: "success", results: result });
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", msg: error });
  }
};

const getPostByLike = async (req, res) => {
  try {
    const result = await postModel
      .find()
      .sort({ likes: "desc" })
      .populate("authorID");
    res.json({ status: "success", results: result });
  } catch (error) {
    res.json({ status: "failed", msg: error });
  }
};

const getPostByDestination = async (req, res) => {
  try {
    const result = await postModel
      .find({
        city: req.query.city,
      })
      .populate("authorID");
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
  updatePost,
  getPostByView,
  getPostByLike,
  getPostByDestination,
  getPostByID,
};
