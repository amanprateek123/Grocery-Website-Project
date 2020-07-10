
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        deliverOn: {
            type: Sequelize.DATEONLY,
        },
        price: {
            type: Sequelize.FLOAT,
        },
        shippingAddress: {
            type: Sequelize.STRING
        }
    },
        {
            tableName: 'db_ld_order'
        }
    )

    return Order;
};