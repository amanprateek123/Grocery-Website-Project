
const fs = require('fs')
const path = require('path')

const db = require('../utils/database')
const csv = require('csvtojson')

const { validateProduct } = require('../utils/validators')


const { validationResult } = require('express-validator')
const { Op } = require('sequelize')
const order = require('../models/order')

// *** DB Functions
async function createProduct(prod, files) {
    // Validation


    return new Promise((resolve, reject) => {

        let errors = validateProduct(prod);
        if (errors.length) {
            resolve({ status: 422, errors: errors, product: prod });
            return;
        }

        db.product.create({
            name: prod.name,
            description: prod.description,
            brand: prod.brand,
            keywords: prod.keywords,
            categoryId: prod.categoryId
        }).then(_product => {
            console.log(" >> ADDED PRODUCT: ", _product.id);

            Promise.all(
                prod.skus.map((sku, i) => {
                    return db.sku.create({
                        productId: _product.id,
                        code: sku.code,
                        name: sku.name,
                        price: sku.price,
                        stockQuantity: sku.stockQuantity,
                        weight: sku.weight,
                        extraCharges: sku.extraCharges,
                        json: sku.json
                    }).then(_sku => {
                        console.log(" >> ADDED SKU: ", _sku.id);
                        return Promise.all(
                            [
                                ...(function () {
                                    try {
                                        return files[`images${i}`].map(image => {
                                            return db.image.create({
                                                skuId: _sku.id,
                                                src: image.path.replace('public', ''),
                                            }).then(_img => {
                                                console.log(" >> ADDED IMG: ", _img.id);
                                                return _img
                                            })
                                        })
                                    }
                                    catch (e) {
                                        return []
                                    }
                                }()),

                                ...(function () {
                                    try {
                                        return sku.images.map(image => {
                                            return db.image.create({
                                                ...(image.id) && { id: image.id },
                                                skuId: _sku.id,
                                                src: image.src,
                                            }).then(_image => {
                                                console.log(" >> PRESERVED Image: ", _image.id);
                                                return _image
                                            })
                                        })
                                    }
                                    catch (e) {
                                        return []
                                    }

                                }()),

                                ...sku.attributes.map(attr => {
                                    return db.attribute.create({
                                        skuId: _sku.id,
                                        name: attr.name,
                                        value: attr.value,
                                    }).then(_attr => {
                                        console.log(" >> ADDED attr: ", _attr.id);
                                        return _attr
                                    })
                                })
                            ]
                        ).then(imatrr => {
                            return console.log(" >> IMAGES AND ATTRIBUTES DONE");
                        })
                    })
                })
            ).then(_skus => {
                console.log(" >> SKUS DONE");
                resolve({ status: 200, product: _product })
            })
        })
    })

}



// *** Single UPLOADS ***

exports.addProduct = (req, res, next) => {
    let prod = req.body;

    // console.log(req.body);
    // console.log(req.files);


    // Validate product
    const valErrors = validationResult(req);

    if (!valErrors.isEmpty()) {
        let files = { ...req.files };
        for (fileArray in files) {
            files[fileArray].forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.log('FAILED TO DELETE ', err);
                    else console.log('DELETING Due to Validation Error.');
                })
            })
        }
        return res.status(422).json({ status: 422, errors: valErrors.array() });
    }

    createProduct(prod, req.files).then(_result => {
        res.json({ status: 200, message: `Product Added with ID : ${_result.product.id}`, product: _result.product })
    })

}


// *** Edit ***
exports.deleteProduct = (req, res) => {
    let productId = parseInt(req.body.productId);

    if (req.body.method == 'hard') {
        console.log('Request to HARD delete product with ID: ' + productId);

        db.product.findByPk(productId, {
            include: [
                {
                    model: db.sku,
                    include: [
                        {
                            model: db.image
                        },
                        {
                            model: db.attribute
                        }
                    ]
                }
            ]
        }).then(_product => {

            if (_product) {

                // Delete Images Linked to Product.
                _product.skus.forEach(_sku => {
                    _sku.images.forEach(_image => {
                        fs.unlink(path.join('public', _image.src), (err) => {
                            err ? console.log('::: Deletion ERROR ', err.message)
                                : console.log('::: DELETED IMAGE public', _image.src);
                        })

                    })
                })

                // All Associated Itms with that product will be deleted automatically due to OnDelete : CASCADE
                _product.destroy().then(result => {
                    res.json({ status: 200, message: "deleted Successfully", product: _product })
                });
            }
            else {
                return res.json({ status: 400, message: "NO Such Product" })
            }
        }).catch(err => {
            console.log(err);
            res.json({ status: 500, message: "Server Error" });
        })
    }
    else {
        db.product.findByPk(productId, {
            include: [
                {
                    model: db.sku,
                    include: [
                        {
                            model: db.image
                        },
                        {
                            model: db.attribute
                        }
                    ]
                }
            ]
        }).then(async _product => {
            if (_product) {
                console.log('Request to SOFT delete product with ID: ' + productId);
                _product.skus.forEach(_sku => {
                    _sku.stockQuantity = 0;
                    _sku.save();
                })

                await _product.save();
                res.json({ status: 200, message: "SOFT Deleted Successfully" })
            }
            else {
                return res.json({ status: 400, message: "NO Such Product" })
            }
        }).catch(err => {
            console.log(err);
            res.json({ status: 500, message: "Server Error" });
        })
    }

}

exports.editProduct = async (req, res, next) => {

    // product is expected with respective Ids.

    let prod = req.body;

    // console.log(req.body);
    // console.log(req.files);

    // Validate product
    const valErrors = validationResult(req);

    if (!valErrors.isEmpty()) {
        let files = { ...req.files };
        for (fileArray in files) {
            files[fileArray].forEach(file => {
                fs.unlink(file.path, (err) => {
                    if (err) console.log('FAILED TO DELETE ', err);
                    else console.log('DELETING Due to Validation Error.');
                })
            })
        }
        return res.status(422).json({ status: 422, errors: valErrors.array() });
    }


    // DELETE Previous Product
    await db.product.findByPk(prod.id, {
        include: [
            {
                model: db.sku,
                include: [
                    {
                        model: db.image
                    },
                    {
                        model: db.attribute
                    }
                ]
            }
        ]
    }).then(async _product => {

        if (_product) {

            // Delete Images Linked to Product. (NOT in Edit Case)
            // _product.skus.forEach(_sku => {
            //     _sku.images.forEach(_image => {
            //         fs.unlink(path.join('public', _image.src), (err) => {
            //             err ? console.log('::: Deletion ERROR ', err.message)
            //                 : console.log('::: DELETED IMAGE public', _image.src);
            //         })

            //     })
            // })

            // All Associated Itms with that product will be deleted automatically due to OnDelete : CASCADE
            await _product.destroy().then(result => {
                console.log('DELETED PRODUCT');
            });
        }
        else {
            return res.json({ status: 400, message: "NO Such Product" })
        }
    }).catch(err => {
        console.log(err);
        return res.json({ status: 500, message: "Server Error" });
    })


    // Create New Product On Same Id's
    db.product.create({
        id: prod.id,
        name: prod.name,
        description: prod.description,
        brand: prod.brand,
        keywords: prod.keywords,
        categoryId: prod.categoryId
    }).then(_product => {
        console.log(" >> ADDED PRODUCT: ", _product.id);

        Promise.all(
            prod.skus.map((sku, i) => {
                return db.sku.create({
                    ...(sku.id) && { id: sku.id },
                    productId: _product.id,
                    code: sku.code,
                    name: sku.name,
                    price: sku.price,
                    stockQuantity: sku.stockQuantity,
                    json: sku.json
                }).then(_sku => {
                    console.log(" >> ADDED SKU: ", _sku.id);
                    return Promise.all(
                        [
                            // New Image Uploads
                            ...(function () {
                                try {
                                    return req.files[`images${i}`].map(image => {
                                        return db.image.create({
                                            skuId: _sku.id,
                                            src: image.path.replace('public', ''),
                                        }).then(_img => {
                                            console.log(" >> ADDED IMG: ", _img.id);
                                            return _img
                                        })
                                    })
                                }
                                catch (e) {
                                    return []
                                }
                            }()),

                            // Old Image Paths
                            ...sku.images.map(image => {
                                return db.image.create({
                                    ...(image.id) && { id: image.id },
                                    skuId: _sku.id,
                                    src: image.src,
                                }).then(_image => {
                                    console.log(" >> PRESERVED Image: ", _image.id);
                                    return _image
                                })
                            }),

                            // Attributes
                            ...sku.attributes.map(attr => {
                                return db.attribute.create({
                                    ...(attr.id) && { id: attr.id },
                                    skuId: _sku.id,
                                    name: attr.name,
                                    value: attr.value,
                                }).then(_attr => {
                                    console.log(" >> ADDED attr: ", _attr.id);
                                    return _attr
                                })
                            })
                        ]
                    ).then(imatrr => {
                        // return console.log(" >> IMAGES AND ATTRIBUTES DONE");
                    })
                })
            })
        ).then(_skus => {
            console.log(" >> SKUS DONE : ");
            res.json({ message: "Product Added", status: 200, product: _product })
        }).catch(err => {
            console.log(err);
        })
    })

}


// *** BULK UPLOADS ***
exports.addProducts = (req, res) => {

    // if file type is not csv return error.
    if (['application/vnd.ms-excel', 'text/csv'].includes(req.file.mimetype)) {
        // fields of every product must match with what is in database.
        // convert csv to json
        csv().fromString(req.file.buffer.toString('utf-8')).then(json => {
            let rows = json;
            let promises = [];
            let product = {};
            let pn = 1;

            ['sn', 'op', 'categoryId', 'name', 'brand', 'description', 'keywords', 'code', 'model', 'price', 'stock', 'json', 'weight', 'extraCharges', 'src', 'attr', 'attrv'].forEach(field => {
                if (!rows[0].hasOwnProperty(field)) {
                    res.json({ status: 400, message: `SERVER: Please Submit a CSV file with fields [sn,op,categoryId,name,brand,description,keywords,code,model,price,stock,json,weight,extraCharges,src,attr,attrv]. Fields don't match.` })
                    return;
                }
            })

            let failed = [];
            let success = [];

            rows.forEach((row, i) => {
                if (row.op === 'p') {
                    if (product.name) {
                        promises.push(createProduct(product, null))
                    }
                    product = {};
                    product.categoryId = row.categoryId;
                    product.name = row.name;
                    product.brand = row.brand;
                    product.description = row.description;
                    product.keywords = row.keywords;
                }
                else if (row.op === 's') {
                    if (!product.skus) {
                        product.skus = [];
                    }
                    let sku = {
                        code: row.code,
                        name: row.model,
                        price: row.price,
                        stockQuantity: row.stock,
                        json: row.json,
                        images: row.src.split(',').map(src => ({ src: src }))
                    }
                    let attrs = row.attr.split(',');
                    let attrv = row.attrv.split(',');
                    sku.attributes = attrs.map((attr, i) => ({ name: attr, value: attrv[i] }));

                    product.skus.push(sku);
                }
                else {

                }
            })
            if (product.name) {
                promises.push(createProduct(product, null))
            }

            Promise.all(promises).then(result => {
                console.log(result)
                errors = result.filter(p => p.status != 200);
                success = result.filter(p => p.status == 200);
                res.json({ status: 200, message: `${success.length} products added.`, errors })
            }).catch(err => {
                console.log(err);
                res.json({ status: 500, message: err.message })
            })
        })
    }
    else {
        res.json({ status: 400, message: `Please Submit a CSV file with fields [sn,op,categoryId,name,brand,description,keywords,code,model,price,stock,json,weight,extraCharges,src,attr,attrv].` })
    }

}

exports.addCategories = (req, res) => {

    if (['application/vnd.ms-excel', 'text/csv'].includes(req.file.mimetype)) {
        csv().fromString(req.file.buffer.toString('utf-8')).then(json => {
            let categories = json;
            let promises = [];
            let errors = [];
            let successes = [];

            // fields of every product must match with what is in database.
            categories.forEach(category => {
                promises.push(
                    db.parentCategory.findAll({
                        where: {
                            name: category.parentCategory
                        }
                    }).then(async result => {
                        let parentCategory = result[0];

                        if (parentCategory) {
                            await db.category.findAll({
                                where: {
                                    name: category.name
                                }
                            }).then(async result => {
                                if (result[0]) {
                                    // Category Already Exist
                                    errors.push({ message: `${category.name} category exists in parentCategory ${category.parentCategory}`, category })
                                } else {
                                    await db.category.create({
                                        parentCategoryId: parentCategory.id,
                                        name: category.name
                                    }).then(result => {
                                        successes.push(category);
                                    })

                                }
                            })
                        } else {
                            console.log(err);
                            // No Such parentCategory
                            errors.push({ message: `No ${category.parentCategory} parentCategory exist for category ${category.name}`, category })

                        }

                    }).catch(err => {
                        console.log(err);
                        // No Such parentCategory
                        errors.push({ message: `No ${category.parentCategory} parentCategory exist for category ${category.name}`, category })
                    })
                );
            })

            Promise.all(promises).then(done => {
                res.json({ status: 200, successes, errors })
            })

        })
    }
    else {
        res.json({ status: 400, message: `Please Submit a CSV file with fields [parentCategory, name].` })
    }
}

exports.addParentCategories = (req, res) => {

    if (['application/vnd.ms-excel', 'text/csv'].includes(req.file.mimetype)) {
        csv().fromString(req.file.buffer.toString('utf-8')).then(json => {
            let parentCategories = json;
            let promises = [];
            let errors = [];
            let successes = [];

            // fields of every product must match with what is in database.
            parentCategories.forEach(category => {
                promises.push(
                    db.department.findAll({
                        where: {
                            name: category.department
                        }
                    }).then(async result => {
                        let department = result[0];

                        if (department) {
                            await db.parentCategory.findAll({
                                where: {
                                    name: category.name
                                }
                            }).then(async result => {
                                if (result[0]) {
                                    // parent Category Exists
                                    errors.push({ message: `${category.name} category exists in department ${category.department}`, category })
                                }
                                else {
                                    await db.parentCategory.create({
                                        departmentId: department.id,
                                        name: category.name
                                    }).then(result => {
                                        successes.push(category);
                                    })
                                }
                            })
                        } else {
                            console.log(err);
                            // No Such Department
                            errors.push({ message: `No ${category.department} department exist for category ${category.name}`, category })
                        }

                    }).catch(err => {
                        console.log(err);
                        // No Such Department
                        errors.push({ message: `No ${category.department} department exist for category ${category.name}`, category })
                    })
                );
            })

            Promise.all(promises).then(done => {
                res.json({ status: 200, successes, errors })
            })

        })
    }
    else {
        res.json({ status: 400, message: `Please Submit a CSV file with fields [department,name].` })
    }
}

exports.addDepartments = (req, res) => {

    if (['application/vnd.ms-excel', 'text/csv'].includes(req.file.mimetype)) {
        csv().fromString(req.file.buffer.toString('utf-8')).then(json => {
            let departments = json;
            let promises = [];
            let errors = [];
            let successes = [];

            // fields of every product must match with what is in database.
            departments.forEach(department => {
                promises.push(
                    db.department.findAll({
                        where: {
                            name: department.name
                        }
                    }).then(result => {
                        if (result[0]) {
                            // skip if already exists.
                            errors.push({ message: `${department.name} department Already exist.`, department })
                        }
                        else {
                            db.department.create({
                                name: department.name
                            }).then(result => {
                                successes.push(department)
                            })
                        }
                    })

                );
            })

            Promise.all(promises).then(done => {
                res.json({ status: 200, successes, errors })
            })

        })
    }
    else {
        res.json({ status: 400, message: `Please Submit a CSV file with fields [name].` })
    }
}

exports.homePage = async (req, res) => {
    console.log(req.body)
    await db.homepage.destroy({ where: {} })
    let data = req.body
    Promise.all(
        data.map((item, i) => {
            return db.homepage.create({
                heading: item.heading,
                value: item.value,
                fieldType: item.fieldType,
                subHeading: item.subHeading,
                order: i + 1
            }
            ).then(add => {
                console.log("Row Added")
            })
        })
    ).then(result => {
        console.log(result)
        res.json({ message: "Successfully Added", status: 201, data: req.body })
    }).catch(e => {
        console.log(e)
        res.json({ message: "Uploading failed" })
    })

}

//get homepage data
exports.getHome = async (req, res) => {
    db.homepage.findAll({
        order: [['order', 'ASC']]
    }).then(data => res.json(data)).catch((err) => res.json(err))
}

//offers
exports.offers = async (req, res) => {
    console.log(req.body)
    let data = req.body
    const offer = await db.offers.findAll({ where: { offerCode: data.offerCode } })
    if (offer) {
        await db.offers.destroy({ where: { offerCode: data.offerCode } })
    }
    db.offers.create({
        offerCode: data.offerCode,
        startDate: data.startDate,
        endDate: data.endDate,
        discount: data.discount,
        minAmt: data.minAmt
    }
    ).then(result => {
        console.log(result)
        res.json({ message: "Successfully Added", status: 201, data: req.body })
    }).catch(e => {
        console.log(e)
        res.json({ message: "Uploading failed" })
    })
}

//getOffers
exports.getOffers = async (req, res) => {
    db.offers.findAll({}).then(data => res.json(data)).catch(e => {
        res.json(e)
        console.log('error', e)
    })
}

exports.delOffers = async (req, res) => {
    const data = req.body
    console.log(data)
    const offer = await db.offers.findAll({ where: { offerCode: data.offerCode } })
    try {
        await db.offers.destroy({
            where: {
                offerCode: data.offerCode
            }
        })
        res.json({ message: 'Offer Deleted' })
    }
    catch (e) {
        console.log(e)
        res.json(e)
    }
}


//  * ORDERS

exports.getOrders = async (req, res) => {
    let where = {}
    let limit = 10;
    parseInt(req.query.limit) ? (limit = Math.max(0, parseInt(req.query.limit))) : null;
    let offset = (parseInt(req.query.page) - 1) * limit || 0;
    req.query.id ? (where.id = req.query.id) : null
    req.query.date ? (where.createdAt = { [Op.gt]: new Date(req.query.date) }) : null
    req.query.statusId ? (where.statusId = req.query.statusId) : null;
    req.query.status ? (where['$status.status$'] = req.query.status) : null;
    req.query.skuId ? (where['$orderItems.sku.id$'] = req.query.skuId) : null;

    let meta = { count: {} };

    let emptyOptions = {
        subQuery: false,
        group: ['id'],
        nest: true,
        where: {
            ...where
        },
        order: [['createdAt', 'DESC']],
        offset: offset,
        limit: limit,
        attributes: ['id'],
        include: [
            {
                model: db.orderItem,
                attributes: [],
                include: {
                    model: db.sku,
                    attributes: [],
                    include: [
                        {
                            model: db.product,
                            attributes: [],
                        },
                        {
                            model: db.image,
                            attributes: [],
                        }
                    ]
                },


            },
            {
                model: db.status,
                attributes: [],
            },
            {
                model: db.user,
                attributes: [],
            }
        ],
    }


    db.order.count({ ...emptyOptions, where: { ...where, statusId: 1 } })
        .then(c => {
            meta.count.ordered = c.length;
            return db.order.count({ ...emptyOptions, where: { ...where, statusId: 2 } })
        })
        .then(c => {
            meta.count.packed = c.length;
            return db.order.count({ ...emptyOptions, where: { ...where, statusId: 3 } })
        })
        .then(c => {
            meta.count.shipped = c.length;
            return db.order.count({ ...emptyOptions, where: { ...where, statusId: 4 } })
        })
        .then(c => {
            meta.count.delivered = c.length;
            return db.order.count(emptyOptions)
        })

        .then(orders => {
            let orderIds = orders.map(o => o.id)
            return db.order.findAll({
                where: {
                    id: { [Op.in]: orderIds }
                },
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: db.orderItem,
                        include: {
                            model: db.sku,
                            attributes: { exclude: ['json', 'createdAt', 'updatedAt'] },
                            include: [
                                {
                                    model: db.product,
                                    attributes: { exclude: ['description', 'keywords', 'createdAt', 'updatedAt'] }
                                },
                                {
                                    model: db.image,
                                    attributes: ['src']
                                }
                            ]
                        },


                    },
                    {
                        model: db.status,
                        attributes: ['status', 'index']
                    },
                    {
                        model: db.user,
                        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
                    }
                ],
            })
        })
        .then(orders => {
            orders = orders.map(o => {
                o = o.toJSON();
                o.deliveryCharges = o.price - o.orderItems.reduce((total, oi) => total + oi.sku.price, 0);
                return o;
            })
            console.log(orders);

            res.json({ meta, orders });
        }).catch(err => {
            res.json(err)
            console.error(err);
        })
}

exports.getOrderedItems = async (req, res) => {

    let where = {};

    db.sku.findAll({
        where: {
            ['$orderItems.id$']: {
                [Op.not]: null // ONLY THOSE SKUS WHICH ARE ORDERED
            },
            ['$orderItems.order.statusId$']: {
                [Op.not]: 4 // NOT DELIVERED
            },
            ...where
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'json'] },
        include: [
            {
                model: db.orderItem,
                attributes: ['id'],
                include: {
                    model: db.order
                }
            },
            {
                model: db.product,
                attributes: { exclude: ['createdAt', 'updatedAt', 'keywords', 'description'] },

            }
        ]
    }).then(orderedItems => {
        res.json(orderedItems)
    })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
}


exports.setStatus = async (req, res) => {
    let orderId = req.query.orderId;
    let statusId = req.query.statusId;
    let remarks = req.query.remarks || null;

    try {
        let order = await db.order.findByPk(orderId);
        order.statusId = statusId;
        if (remarks) order.remarks = remarks;
        await order.save();

        // State Specific Notifications / Emails 
        switch (statusId) {
            case 1: // ORDERED
                console.log('[_] Ordered');
                break;

            case 2: // PACKED
                console.log('[_] PACKED');
                break;

            case 3: // SHIPPED
                console.log('[_] SHIPPED');
                break;

            case 4: // DELIVERED
                console.log('[_] DELIVERED');
                break;

        }

        res.json({ status: 200, message: `Order ${['Ordered', 'Packed', 'Shipped', 'Delivered'][orderId]}` })
    }
    catch (err) {
        console.log(err);
        res.json({ status: 500, error: err });
    }

}