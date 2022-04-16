const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.json({ status: "failed", msg: "no token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.userID = id;
    req.username = username;
    next();
  } catch (error) {
    return res.json({ status: "failed", msg: error });
  }
};

module.exports = authenticate;
