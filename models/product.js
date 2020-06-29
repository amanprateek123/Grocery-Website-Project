
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
        },
        keywords: {
            type: Sequelize.STRING,
        }
    },
        {
            tableName: 'db_ld_product'
        }
    )

    return Product;
};