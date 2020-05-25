const Sequelize = require('sequelize')
require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mariadb'
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../models/user')(sequelize, Sequelize);
db.products = require('../models/product')(sequelize, Sequelize);
db.otp = require('../models/otp')(sequelize, Sequelize);

//Relations
db.otp.belongsTo(db.users);
db.users.hasMany(db.otp);

// db.posts.belongsTo(db.users);
// db.users.hasMany(db.posts);

module.exports = db;