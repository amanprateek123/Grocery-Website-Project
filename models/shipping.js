
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

        deliveryOtp: { // to mark order Delivered.
            type: Sequelize.STRING,
        }
    },
        {
            tableName: 'db_ld_shipping'
        }
    )

    return Shipping;
};