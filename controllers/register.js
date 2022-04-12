const path = require('path');

const getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'html', 'register.html'));
};

const registerUser = (req, res) => {
  console.log(req.body);
  res.json({ status: 'success', name: req.body.name, email: req.body.email });
};

module.exports = {
  getRegisterPage,
  registerUser,
};
