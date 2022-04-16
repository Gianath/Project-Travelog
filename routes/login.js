const express = require("express");
const router = express.Router();

const {
  getLoginPage,
  checkCredentials,
} = require("../controllers/loginController");

router.route("/").get(getLoginPage);
router.route("/api").post(checkCredentials);

module.exports = router;
