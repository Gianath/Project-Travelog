const express = require('express');
const router = express.Router();

const { getRegisterPage, registerUser } = require('../controllers/register');

router.route('/').get(getRegisterPage);
router.route('/api').post(registerUser);

module.exports = router;
