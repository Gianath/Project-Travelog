const path = require("path");

const getDashboardPage = async () => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "dashboard.html"));
};

module.exports = {
  getDashboardPage,
};
