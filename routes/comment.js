const express = require("express");
const router = express.Router();

const { createComment } = require("../controllers/commentController");

const auth = require("../middleware/auth");

router.route("/api/").post(auth, createComment);

module.exports = router;
