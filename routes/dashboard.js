const express = require("express");
const router = express.Router();

const { getDashboardPage } = require("../controllers/dashboardController");

router.route("/").get(getDashboardPage);

module.exports = router;
