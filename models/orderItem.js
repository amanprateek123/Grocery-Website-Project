
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const OrderItem = sequelize.define('orderItem', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
    },
        {
            tableName: 'db_ld_orderItem'
        }
    )

    return OrderItem;
};