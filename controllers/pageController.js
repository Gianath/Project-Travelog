const path = require("path");

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "login.html"));
};

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"));
};

const getDashboardPage = async () => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "dashboard.html"));
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  getDashboardPage,
};
