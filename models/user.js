const Sequelize = require('sequelize')
const sequelize = require("../utils/database")

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
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
    address: {
        type: Sequelize.INTEGER,
    },
    verified: {
        type: Sequelize.BOOLEAN,
        default: false
    }

})

module.exports = User;