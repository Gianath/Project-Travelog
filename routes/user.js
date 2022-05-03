const express = require("express");
const router = express.Router();

const {
  checkCredentials,
  registerUser,
  getCurrentUser,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

router.route("/api").post(checkCredentials).get(auth, getCurrentUser);
router.route("/api/register").post(registerUser);

module.exports = router;
