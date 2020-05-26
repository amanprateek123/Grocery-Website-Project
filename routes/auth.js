const express = require('express')
const router = express.Router();
const authCtrl = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

router.post('/otp', authCtrl.sendOTP);
router.post('/verify-otp', authCtrl.verifyOTP);
router.post('/login', authCtrl.login);

router.post('/change-password', isAuth, authCtrl.changePassword);

// password reset
router.post('/pr-otp', authCtrl.prOTP);
router.post('/pr-otp-verify', authCtrl.prOTPVerify);
router.post('/pr-req', authCtrl.prReq);

router.get('/test', authCtrl.getTest)

module.exports = router