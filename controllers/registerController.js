const path = require("path");

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "register.html"));
};

module.exports = {
  getRegisterPage,
};
