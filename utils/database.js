const Sequelize = require('sequelize')
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mariadb'
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../models/user')(sequelize, Sequelize);
db.product = require('../models/product')(sequelize, Sequelize);
db.otp = require('../models/otp')(sequelize, Sequelize);
db.address = require('../models/address')(sequelize, Sequelize);

//Relations
db.otp.belongsTo(db.user);
db.user.hasMany(db.otp);

db.address.belongsTo(db.user);
db.user.hasMany(db.address);

module.exports = db;