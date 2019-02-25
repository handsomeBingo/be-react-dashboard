let express = require('express');
let router = express.Router();
let auth = require('../controller/auth');
router.post('/auth/login', auth.login);
router.post('/auth/getUserInfo', auth.getUserInfo);
router.post('/auth/changeInfo', auth.changeInfo);
router.post('/auth/register', auth.register);

module.exports = router
