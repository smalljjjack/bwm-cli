const express = require('express');
const User = require('../controllers/user');
const router = express.Router();

router.get('/auth', User.auth);

router.post('/register', User.register);

module.exports = router;
