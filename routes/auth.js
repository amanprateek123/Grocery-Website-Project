const express = require('express')
const router = express.Router();
const authCtrl = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

router.post('/otp', authCtrl.sendOTP);
router.post('/verify-otp', authCtrl.verifyOTP);
router.post('/register', authCtrl.registerUserDetails);
router.post('/login', authCtrl.login);

router.get('/profile', isAuth, authCtrl.getProfile)

module.exports = router