const vld = require('validator')

exports.validateProduct = (prod) => {
    let errors = [];
    if (!vld.isLength(prod.name, {
        min: 5,
        max: 30
    })) {
        errors.push({
            param: 'name',
            msg: 'Product Name  should be between 5-30 characters long.',
            value: prod.name
        })
    }

    if (!vld.isLength(prod.brand, {
        min: 5,
        max: 20
    })) {
        errors.push({
            param: 'brand',
            msg: 'Product brand  should be between 5-20 characters long.',
            value: prod.brand
        })
    }

    if (!vld.isLength(prod.description, {
        min: 5
    })) {
        errors.push({
            param: 'description',
            msg: 'Product description  should be at least 5 characters long.',
            value: prod.description
        })
    }

    if (!vld.isInt('' + prod.categoryId)) {
        errors.push({
            param: 'categoryId',
            msg: 'categoryId should an Integer.',
            value: prod.categoryId
        })
    }

    prod.skus.forEach((sku, i) => {
        if (!vld.isLength(sku.code, {
            min: 1
        })) {
            errors.push({
                param: 'sku.code',
                msg: `No SKU code provided. - ${i}`,
                value: sku.code
            })
        }

        if (!vld.isLength(sku.name, {
            min: 1
        })) {
            errors.push({
                param: 'sku.name',
                msg: `Model name should note be blank - ${i}`,
                value: sku.name
            })
        }

        if (!vld.isJSON(sku.json)) {
            errors.push({
                param: 'sku.json',
                msg: `Invalid JSON - ${i}`,
                value: sku.json
            })
        }
    })

    return errors;

}

// AddProduct
exports.productSchema = {
    name: {
        isLength: {
            errorMessage: 'Product Name is too Short.(min 4)',
            options: {
                min: 4,
            }
        }
    },
    brand: {
        isLength: {
            errorMessage: 'Brand Name is too Short.(min 3)',
            options: {
                min: 3,
            }
        }
    },
    description: {
        isLength: {
            errorMessage: 'Description is too Short.(min 5)',
            options: {
                min: 5,
            }
        }
    },
    categoryId: {
        isInt: {
            errorMessage: 'Category Id Should be a number'
        }
    },
    skus: {
        isArray: {
            errorMessage: 'skus should be an Array.'
        },
        isLength: {
            options: {
                min: 1
            },
            errorMessage: 'At least 1 SKU required.'
        }
    },
    'skus.*.price': {
        isNumeric: {
            errorMessage: 'Price should be Numeric.'
        }
    },
    'skus.*.stockQuantity': {
        isInt: {
            errorMessage: 'Stock Quantity should be integer.'
        }
    },
    'skus.*.attributes': {
        isArray: {
            errorMessage: 'Attributes has to be an array.'
        }
    },
    'skus.*.attributes.*.name': {
        notEmpty: {
            errorMessage: 'Empty Attribute Name.'
        }
    },
    'skus.*.attributes.*.value': {
        notEmpty: {
            errorMessage: 'Empty Attribute Value.'
        }
    },
    'skus.*.json': {
        isJSON: {
            errorMessage: "Invalid SKU JSON"
        }
    }

}