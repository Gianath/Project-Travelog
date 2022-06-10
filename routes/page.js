const express = require("express");
const router = express.Router();

const {
  getLoginPage,
  getRegisterPage,
  getDashboardPage,
  getDestinationPage,
} = require("../controllers/pageController");

router.route("/login").get(getLoginPage);
router.route("/register").get(getRegisterPage);
router.route("/dashboard").get(getDashboardPage);
router.route("/destination").get(getDestinationPage);

module.exports = router;
