
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('db_ld_product', {
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
        categoryId: {
            type: Sequelize.INTEGER,
            default: 0
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
        }
    })

    return Product;
};