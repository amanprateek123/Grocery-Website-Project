
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const shippingAddress = sequelize.define('shippingAddress', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        country: {
            type: Sequelize.STRING,
        },
        zip: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        mobile: {
            type: Sequelize.STRING,
        },
        additionalInfo: {
            type: Sequelize.STRING,
        },
        distance: {
            type: Sequelize.FLOAT
        },
        isPrimary: {
            type: Sequelize.BOOLEAN,
        }
    },
        {
            tableName: 'db_ld_shippingAddress'
        }
    )

    return shippingAddress;
};