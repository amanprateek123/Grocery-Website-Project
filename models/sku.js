
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

        // color , variant , size , weight etc.
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'variant'
        },

        // 2kg , 3kg ; red, green ; M,L,XL etc.
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: '0'
        },

        description: {
            type: Sequelize.STRING,
        },

        stockQuantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    },
        {
            tableName: 'db_ld_sku'
        }
    )

    return SKU;
};