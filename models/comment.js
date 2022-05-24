const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    authorID: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
  },
  { collection: "Comments" }
);

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = commentModel;
