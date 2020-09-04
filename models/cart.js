
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const Cart = sequelize.define('cart', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        }

    },
        {
            tableName: 'db_ld_cart'
        }
    )

    return Cart;
};