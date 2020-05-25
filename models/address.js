
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const Address = sequelize.define('address', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false,
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
            primaryKey: true
        },
        mobile: {
            type: Sequelize.STRING,
        },
        additionalInfo: {
            type: Sequelize.STRING,
        },
    })

    return Address;
};