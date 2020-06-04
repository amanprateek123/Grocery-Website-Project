const Sequelize = require('sequelize')
require('dotenv').config()

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DIALECT || 'mariadb'
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../models/user')(sequelize, Sequelize);
db.product = require('../models/product')(sequelize, Sequelize);
db.otp = require('../models/otp')(sequelize, Sequelize);
db.address = require('../models/address')(sequelize, Sequelize);
db.parentCategory = require('../models/parentCategory')(sequelize, Sequelize);
db.category = require('../models/category')(sequelize, Sequelize);
db.subCategory = require('../models/subCategory')(sequelize, Sequelize);

//Relations
db.otp.belongsTo(db.user);
db.user.hasMany(db.otp);

db.address.belongsTo(db.user);
db.user.hasMany(db.address);

db.category.belongsTo(db.parentCategory);
db.parentCategory.hasMany(db.category);

db.subCategory.belongsTo(db.category);
db.category.hasMany(db.subCategory);



module.exports = db;