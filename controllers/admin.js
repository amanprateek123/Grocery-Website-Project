
const db = require('../utils/database')

exports.addProducts = (req, res) => {
    // req.body.products  will contain the array of products (json) or csv or xlxs

    // if it is excel make it a javascript array of products. 


    let products = [];
    // let promises = [];

    // fields of every product must match with what is in database.
    products.forEach(product => {
        db.product.create({
            ...product
        }).then(result => {
            console.log('a product added.');

        }).catch(err => {
            console.log('Cant add: ', err);

        })
    })

    res.json({ status: 200, message: "Adding Products." })

}

exports.addCategories = (req, res) => {

    // extracts categories

    let categories = []

    // fields of every category must match with what is in database.
    categories.forEach(category => {
        db.category.create({
            ...category
        }).then(result => {
            console.log('a product added.');

        }).catch(err => {
            console.log('Cant add: ', err);

        })
    })

    res.json({ status: 200, message: "Adding Categories." })
}