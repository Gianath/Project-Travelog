const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

const userModel = mongoose.model("UserSchema", UserSchema);

module.exports = { userModel };
