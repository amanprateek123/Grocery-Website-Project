const Sequelize = require('sequelize')
require('dotenv').config()


var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mariadb'
})

module.exports = sequelize;