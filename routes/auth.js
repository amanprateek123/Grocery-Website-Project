const express = require('express')
const router = express.Router();
const authCtrl = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

router.post('/otp', authCtrl.sendOTP);
router.post('/verify-otp', authCtrl.verifyOTP);
router.post('/login', authCtrl.login);

router.get('/test', authCtrl.getTest)

module.exports = router