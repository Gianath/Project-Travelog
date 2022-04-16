const express = require("express");
const router = express.Router();

const {
  getDashboardPage,
  getCurrentUser,
  getPostByView,
  getPostByLike,
} = require("../controllers/dashboardController");

const auth = require("../middleware/auth");

router.route("/").get(getDashboardPage);
router.route("/api/getCurrUser").get(auth, getCurrentUser);
router.route("/api/getPostByView").get(getPostByView);
router.route("/api/getPostByLike").get(getPostByLike);

module.exports = router;
