const express = require("express");
const router = express.Router();

const {
  getDashboardPage,
  getPostByView,
  getPostByLike,
} = require("../controllers/dashboardController");

router.route("/").get(getDashboardPage);
router.route("/api/getPostByView").get(getPostByView);
router.route("/api/getPostByLike").get(getPostByLike);

module.exports = router;
