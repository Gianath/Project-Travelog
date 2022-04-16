const express = require("express");
const router = express.Router();

const {
  getRegisterPage,
  registerUser,
} = require("../controllers/registerController");

router.route("/").get(getRegisterPage);
router.route("/api").post(registerUser);

module.exports = router;
