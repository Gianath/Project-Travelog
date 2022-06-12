const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  getPostByView,
  getPostByLike,
  getPostByDestination,
  getPostByID,
} = require("../controllers/postController");

const auth = require("../middleware/auth");

router.route("/api/getPostByView").get(getPostByView);
router.route("/api/getPostByLike").get(getPostByLike);
router.route("/api/:id").get(getPostByID).patch(updatePost);
router.route("/api/").get(getPostByDestination).post(auth, createPost);

module.exports = router;
