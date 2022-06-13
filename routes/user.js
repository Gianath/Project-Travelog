const express = require("express");
const router = express.Router();

const {
  checkCredentials,
  registerUser,
  getCurrentUser,
  updateUserProfile,
  logoutCurrentUser,
  updateLike,
  checkLike,
} = require("../controllers/userController");

const auth = require("../middleware/auth");

router
  .route("/api")
  .post(checkCredentials)
  .patch(auth, updateUserProfile)
  .get(auth, getCurrentUser);
router.route("/api/register").post(registerUser);
router.route("/api/logout").post(logoutCurrentUser);
router.route("/api/like").post(auth, checkLike).patch(auth, updateLike);

module.exports = router;
