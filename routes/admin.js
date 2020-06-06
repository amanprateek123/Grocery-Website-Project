const express = require('express')
const router = express.Router();
const adminCtrl = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')
const multer = require('../middleware/multer')

router.post('/add-categories', adminCtrl.addCategories)
router.post('/add-products', multer.single('products'), adminCtrl.addProducts)


module.exports = router