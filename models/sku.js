
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

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '0'
        },
        price: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        stockQuantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

        // ! ...
        json: {
            type: Sequelize.TEXT,
        }
    },
        {
            tableName: 'db_ld_sku'
        }
    )

    return SKU;
};