const express = require('express')
const router = express.Router();
const adminCtrl = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')
const multer = require('../middleware/multer')
const { productSchema } = require('../utils/validators')

const { checkSchema } = require('express-validator')

router.post('/add-categories', multer.single('categories'), adminCtrl.addCategories)
router.post('/add-parentCategories', multer.single('parentCategories'), adminCtrl.addParentCategories)
router.post('/add-departments', multer.single('departments'), adminCtrl.addDepartments)
router.post('/add-products', multer.single('products'), adminCtrl.addProducts)

router.post('/add-product', [checkSchema(productSchema)], adminCtrl.addProduct)
router.delete('/delete-product', adminCtrl.deleteProduct)


module.exports = router