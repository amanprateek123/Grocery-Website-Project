
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

                    if (!['name', 'categoryId', 'brand'].includes(prop)) {
                        res.json({ status: 400, message: `Please Submit a CSV file with fields [name,categoryId,brand]. Fields don't match.` })
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

    if (req.file.mimetype == 'text/csv') {
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

    if (req.file.mimetype == 'text/csv') {
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