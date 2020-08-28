const express = require('express')
const router = express.Router();
const shippingCtrl = require('../controllers/shipping')
const isAuth = require('../middleware/is-auth')


router.get('/orders', shippingCtrl.getOrders);
router.post('/set-status', shippingCtrl.setStatus);



module.exports = router