const path = require("path");

const getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "login.html"));
};

const checkCredentials = (req, res) => {
  console.log(req.body);
  res.json({ status: ok, body: req.body });
};

module.exports = {
  getLoginPage,
  checkCredentials,
};
