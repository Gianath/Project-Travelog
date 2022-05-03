const path = require("path");

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "login.html"));
};

module.exports = {
  getLoginPage,
};
