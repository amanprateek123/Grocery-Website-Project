const Sequelize = require('sequelize')
const sequelize = require("../utils/database")

const otp = sequelize.define('otp', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = otp;