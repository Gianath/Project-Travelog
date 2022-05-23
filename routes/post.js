const express = require("express");
const router = express.Router();

const {
  createPost,
  getPostByView,
  getPostByLike,
  getPostByID,
} = require("../controllers/postController");

const auth = require("../middleware/auth");

router.route("/api/getPostByView").get(getPostByView);
router.route("/api/getPostByLike").get(getPostByLike);
router.route("/api/:id").get(getPostByID);
router.route("/api/").post(auth, createPost);

module.exports = router;
