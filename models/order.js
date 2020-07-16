
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
            type: Sequelize.TEXT
        },
        paymentType: {
            type: Sequelize.ENUM(['COD', 'CARD', 'NET BANKING'])
        },
        transactionId: {
            type: Sequelize.STRING
        },
        transactionStatus: {
            type: Sequelize.ENUM(['SUCCESS', 'FAILED'])
        }
    },
        {
            tableName: 'db_ld_order'
        }
    )

    return Order;
};