
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        category: {
            type: Sequelize.INTEGER,
            default: 0
        }
    })

    return Product;
};