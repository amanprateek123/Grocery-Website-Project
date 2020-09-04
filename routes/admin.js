const express = require('express')
const router = express.Router();
const adminCtrl = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')
const multer = require('../middleware/multer')
const multerImage = require('../middleware/multerImage')
const { productSchema } = require('../utils/validators')

const { checkSchema } = require('express-validator')

router.post('/add-categories', multer.single('categories'), adminCtrl.addCategories)
router.post('/add-parentCategories', multer.single('parentCategories'), adminCtrl.addParentCategories)
router.post('/add-departments', multer.single('departments'), adminCtrl.addDepartments)
router.post('/add-products', multer.single('products'), adminCtrl.addProducts)
router.post('/homepage', adminCtrl.homePage)
router.post('/offers', adminCtrl.offers)
router.delete('/offers', adminCtrl.delOffers)

router.post('/add-product',
    multerImage.fields([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({ name: `images${i}`, maxCount: 10 }))),
    (req, res, next) => {
        let prod = JSON.parse(req.body.product);
        req.body = {
            ...req.body,
            ...prod
        }
        next();
    },
    [checkSchema(productSchema)],
    adminCtrl.addProduct)

router.post('/edit-product',
    multerImage.fields([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ({ name: `images${i}`, maxCount: 10 }))),
    (req, res, next) => {
        let prod = JSON.parse(req.body.product);
        req.body = {
            ...req.body,
            ...prod
        }
        next();
    },
    [checkSchema(productSchema)],
    adminCtrl.editProduct)

router.delete('/delete-product', adminCtrl.deleteProduct)

router.get('/orders', adminCtrl.getOrders);
router.get('/ordered-items', adminCtrl.getOrderedItems);
router.post('/set-status', adminCtrl.setStatus);


router.get('/get-users', adminCtrl.getUsers);


module.exports = router