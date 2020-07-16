// Input Data Validation Rules

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