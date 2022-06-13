const commentModel = require("../models/comment");

const createComment = async (req, res) => {
  const { content } = req.body;
  const userID = req.userID;

  try {
    const resp = await commentModel.create({
      authorID: userID,
      content: content,
    });
    res.json({ status: "success", msg: resp });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createComment };
