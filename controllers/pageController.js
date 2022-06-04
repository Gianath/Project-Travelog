const path = require("path");

const getLoginPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "login.html"));
};

const getRegisterPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"));
};

const getDashboardPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "dashboard.html"));
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  getDashboardPage,
};
