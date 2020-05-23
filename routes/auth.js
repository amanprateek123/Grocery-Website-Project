const express = require('express')
const router = express.Router();
const authCtrl = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

router.post('/otp', authCtrl.sendOTP);
router.post('/verify-otp', authCtrl.verifyOTP);
router.post('/login', authCtrl.login);

router.get('/profile', isAuth, authCtrl.getProfile)
router.post('/profile', isAuth, authCtrl.postProfile)

module.exports = router