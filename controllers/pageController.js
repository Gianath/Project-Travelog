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

const getDestinationPage = async (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "html", "destination.html")
  );
};

const getComposePage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "compose.html"));
};

const getHomePage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "index.html"));
};

const getProfilePage = async (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "profile.html"));
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  getDashboardPage,
  getDestinationPage,
  getComposePage,
  getHomePage,
  getProfilePage,
};
