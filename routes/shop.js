const express = require('express')
const router = express.Router();
const shopCtrl = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')

router.get('/homepage', shopCtrl.getHome)
router.get('/offers', shopCtrl.getOffers)

router.get('/get-categories', shopCtrl.getCategories)
router.get('/get-products', shopCtrl.getProducts)
router.get('/pre-search', shopCtrl.predictiveSearch)

router.post('/cart', isAuth, shopCtrl.cart)
router.get('/cart', isAuth, shopCtrl.getCart)

router.get('/get-orders', isAuth, shopCtrl.getOrders)
router.get('/get-status', shopCtrl.getStatus)
router.post('/post-order', isAuth, shopCtrl.postOrder)
router.delete('/get-orders', isAuth, shopCtrl.cancelOrder)


router.get('/get-invoice/:id', isAuth, shopCtrl.getInvoice)

module.exports = router