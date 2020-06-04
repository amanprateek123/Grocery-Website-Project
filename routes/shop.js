const express = require('express')
const router = express.Router();
const shopCtrl = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')

router.get('/get-categories',shopCtrl.getCategories)


module.exports = router