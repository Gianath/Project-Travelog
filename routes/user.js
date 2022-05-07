const express = require("express");
const router = express.Router();

const {
  checkCredentials,
  registerUser,
  getCurrentUser,
  updateUserProfile,
  logoutCurrentUser,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

router
  .route("/api")
  .post(checkCredentials)
  .patch(auth, updateUserProfile)
  .get(auth, getCurrentUser);
router.route("/api/register").post(registerUser);
router.route("/api/logout").post(logoutCurrentUser);

module.exports = router;
