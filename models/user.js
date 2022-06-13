const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "Hi" },
    postCreated: { type: Number, default: 0 },
    postLiked: { type: Number, default: 0 },
    likedPostID: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { collection: "Users" }
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
