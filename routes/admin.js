const express = require('express')
const router = express.Router();
const adminCtrl = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')

router.post('/add-categories', adminCtrl.addCategories)
router.post('/add-products', adminCtrl.addProducts)


module.exports = router