
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const SKU = sequelize.define('sku', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '0'
        },

        // ! ...
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'variant'
        },

        // ! ...
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '0'
        },

        // description: {
        //     type: Sequelize.STRING,
        // },
        // In Rupees
        price: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        stockQuantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

        // ! ...
        json: {
            type: Sequelize.STRING,
        }
    },
        {
            tableName: 'db_ld_sku'
        }
    )

    return SKU;
};