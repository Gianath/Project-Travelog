const express = require("express");
const router = express.Router();

const {
  getLoginPage,
  getRegisterPage,
  getDashboardPage,
} = require("../controllers/pageController");

router.route("/login").get(getLoginPage);
router.route("/register").get(getRegisterPage);
router.route("/dashboard").get(getDashboardPage);

module.exports = router;
