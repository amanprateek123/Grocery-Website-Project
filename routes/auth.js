const express = require('express')
const router = express.Router();
const authCtrl = require('../controllers/auth')

router.post('/otp', authCtrl.sendOTP);
router.post('/verify-otp', authCtrl.verifyOTP);
router.post('/register', authCtrl.registerUserDetails);
router.post('/login', authCtrl.login);

module.exports = router