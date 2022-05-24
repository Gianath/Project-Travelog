const commentModel = require("../models/comment");

const createComment = async (req, res) => {
  const { content, date } = req.body;
  const userID = req.userID;

  const resp = await commentModel.create({
    authorID: userID,
    content: content,
    date: date,
  });

  res.json({ status: "success", msg: resp });
};

module.exports = { createComment };
