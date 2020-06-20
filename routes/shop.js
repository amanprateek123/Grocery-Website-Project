const express = require('express')
const router = express.Router();
const shopCtrl = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')

router.get('/get-categories', shopCtrl.getCategories)
router.get('/get-products', shopCtrl.getProducts)

router.post('/cart', isAuth, shopCtrl.cart)
router.get('/cart', isAuth, shopCtrl.getCart)


module.exports = router