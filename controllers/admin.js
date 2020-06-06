
const db = require('../utils/database')
const csv = require('csvtojson')

exports.addProducts = (req, res) => {

    // if file type is not csv return error.
    if (req.file.mimetype == 'text/csv') {
        // fields of every product must match with what is in database.
        // convert csv to json
        csv().fromString(req.file.buffer.toString('utf-8')).then(json => {
            let products = json;
            let promises = [];

            for (prop in products[0]) {
                if (products[0].hasOwnProperty(prop)) {
                    console.log(prop);

                    if (!['name', 'categoryId', 'brand', 'image'].includes(prop)) {
                        res.json({ status: 400, message: `Please Submit a CSV file with fields [name,categoryId,brand,image]. Fields don't match.` })
                        return;
                    }
                }
            }

            products.forEach(product => {
                promises.push(
                    db.product.create({
                        ...product
                    })
                        .then(result => {
                            console.log('a product added.');

                        }).catch(err => {
                            console.log('Cant add: ', err);

                        })
                );
            })

            Promise.all(promises).then(done => {
                res.json({ status: 200, message: `Added ${promises.length} products.`, products })
            })

        })
    }
    else {
        res.json({ status: 400, message: `Please Submit a CSV file with fields [name,categoryId,brand,image].` })
    }

}

exports.addCategories = (req, res) => {

    if (req.file.mimetype == 'text/csv') {
        csv().fromString(req.file.buffer.toString('utf-8')).then(json => {
            let categories = json;
            let promises = [];

            // fields of every product must match with what is in database.
            categories.forEach(category => {
                promises.push(
                    db.category.create({
                        ...category
                    })
                );
            })

            Promise.all(promises).then(done => {
                res.json({ status: 200, message: `Added ${promises.length} categories.`, categories })
            })

        })
    }
    else {
        res.json({ status: 400, message: `Please Submit a CSV file with fields [name,parentCategoryId].` })
    }
}