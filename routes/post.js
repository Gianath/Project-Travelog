const express = require("express");
const router = express.Router();

const {
  getPostByView,
  getPostByLike,
  getPostByID,
} = require("../controllers/postController");

router.route("/api/getPostByView").get(getPostByView);
router.route("/api/getPostByLike").get(getPostByLike);
router.route("/api/:id").get(getPostByID);

module.exports = router;
