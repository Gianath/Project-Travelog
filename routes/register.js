const express = require("express");
const router = express.Router();

const {
  getRegisterPage,
  registerUser,
} = require("../controllers/registerController");

router.get("/", getRegisterPage);
router.post("/api", registerUser);

module.exports = router;
