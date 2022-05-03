const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "Hi" },
    postCreated: { type: Number, default: 0 },
    postLiked: { type: Number, default: 0 },
  },
  { collection: "Users" }
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
