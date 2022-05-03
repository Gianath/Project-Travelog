const express = require("express");
const router = express.Router();

const {
  getPostByView,
  getPostByLike,
} = require("../controllers/postController");

router.route("/api/getPostByView").get(getPostByView);
router.route("/api/getPostByLike").get(getPostByLike);

module.exports = router;
