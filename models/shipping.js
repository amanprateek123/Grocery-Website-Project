
module.exports = (sequelize, Sequelize) => {
    const Shipping = sequelize.define('shipping', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        // userId : only users with role : D - Delivery Guy
        // orderId: Order assigned to that Delivery Guy
    },
        {
            tableName: 'db_ld_shipping'
        }
    )

    return Shipping;
};