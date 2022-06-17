const postModel = require("../models/post");
const userModel = require("../models/user");

const createPost = async (req, res) => {
  try {
    const { title, content, city, country } = req.body;
    const userID = req.userID;
    const resp = await postModel.create({
      authorID: userID,
      title: title,
      content: content,
      city: city,
      country: country,
    });

    const resp2 = await userModel.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        $inc: { postCreated: 1 },
      }
    );

    res.json({ status: "success", results: resp });
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
      .limit(2)
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
      .limit(2)
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
    const result = await postModel
      .findOne({
        _id: req.params.id,
      })
      // .populate(["authorID", "commentIDs"])
      .populate("authorID")
      .populate({
        path: "commentIDs",
        populate: {
          path: "authorID",
          model: "User",
        },
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
