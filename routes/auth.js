const express = require('express')
const router = express.Router();
const authCtrl = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

const { check, validationResult } = require('express-validator')

// Register
router.post('/otp', [
    check('email').isEmail().normalizeEmail(),
    check('mobile').isMobilePhone(),
    check('password').isLength({ min: 8 }),
    check('firstName').not().isEmpty()
], authCtrl.sendOTP);

router.post('/verify-otp', authCtrl.verifyOTP);

// Login 
router.post('/login', authCtrl.login);

router.post('/change-password', [check('new').isLength({ min: 8 })], isAuth, authCtrl.changePassword);

// password reset
router.post('/pr-otp', authCtrl.prOTP);
router.post('/pr-otp-verify', authCtrl.prOTPVerify);
router.post('/pr-req', [check('password').isLength({ min: 8 })], authCtrl.prReq);

router.get('/test', authCtrl.getTest)

module.exports = router