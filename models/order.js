
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: Sequelize.ENUM(['ordered', 'packed', 'shipped', 'delivered'])
        },
        deliverOn: {
            type: Sequelize.DATEONLY,
        },
        price: {
            type: Sequelize.FLOAT,
        }
    },
        {
            tableName: 'db_ld_order'
        }
    )

    return Order;
};