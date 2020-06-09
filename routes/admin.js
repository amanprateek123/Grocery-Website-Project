const express = require('express')
const router = express.Router();
const adminCtrl = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')
const multer = require('../middleware/multer')

router.post('/add-categories', multer.single('categories'), adminCtrl.addCategories)
router.post('/add-parentCategories', multer.single('parentCategories'), adminCtrl.addParentCategories)
router.post('/add-departments', multer.single('departments'), adminCtrl.addDepartments)
router.post('/add-products', multer.single('products'), adminCtrl.addProducts)


module.exports = router