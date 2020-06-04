const express = require('express')
const router = express.Router();
const profileCtrl = require('../controllers/profile')
const isAuth = require('../middleware/is-auth')

router.get('/profile', isAuth, profileCtrl.getProfile)
router.post('/profile', isAuth, profileCtrl.postProfile)

router.post('/add-address', isAuth, profileCtrl.addAddress)
router.delete('/remove-address', isAuth, profileCtrl.removeAddress)

router.post('/change-email-otp', isAuth, profileCtrl.changeEmailOTP)
router.post('/change-email', isAuth, profileCtrl.changeEmail)

router.post('/change-mobile-otp', isAuth, profileCtrl.changeMobileOTP)
router.post('/change-mobile', isAuth, profileCtrl.changeMobile)



router.get('/test', profileCtrl.getTest)

module.exports = router