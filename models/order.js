
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
        price: { // sum(orderItems.price) + shippingCharges - discount
            type: Sequelize.FLOAT,
        },
        shippingCharges: {
            type: Sequelize.FLOAT,
        },
        discount: {
            type: Sequelize.FLOAT,
        },
        shippingAddress: {
            type: Sequelize.TEXT
        },
        paymentType: {
            type: Sequelize.ENUM(['COD', 'PREPAID',])
        },
        transactionId: {
            type: Sequelize.STRING
        },
        transactionStatus: {
            type: Sequelize.STRING
        },
        verifyDelivery: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isCancelled: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        remarks: {
            type: Sequelize.STRING,
            defaultValue: null
        }
    },
        {
            tableName: 'db_ld_order'
        }
    )

    return Order;
};