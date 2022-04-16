const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    authorID: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    country: { type: String, required: true },
    commentIDs: { type: Array },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { collection: "Posts" }
);

const postModel = mongoose.model("Post", PostSchema);

module.exports = postModel;
