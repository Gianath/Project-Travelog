const express = require("express");
const router = express.Router();

const {
  getLoginPage,
  checkCredentials,
} = require("../controllers/loginController");

router.get("/", getLoginPage);
router.post("/api", checkCredentials);

module.exports = router;
