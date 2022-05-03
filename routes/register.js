const express = require("express");
const router = express.Router();

const { getRegisterPage } = require("../controllers/registerController");

router.route("/").get(getRegisterPage);

module.exports = router;
