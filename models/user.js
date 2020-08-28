
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        mobile: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        role: {
            type: Sequelize.ENUM('U', 'D', 'A'), // normal User | Delivery Guy | Admin
            defaultValue: 'U',
        },
        verified: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        gender: {
            type: Sequelize.ENUM('M', 'F', 'T')
        },
        dob: {
            type: Sequelize.DATEONLY
        }
    },
        {
            tableName: 'db_ld_user'
        }
    )

    return User;
};