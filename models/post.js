const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema(
  {
    authorID: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    commentIDs: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { collection: "Posts" }
);

const postModel = mongoose.model("Post", PostSchema);

module.exports = postModel;
