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
db.shippingAddress = require('../models/shippingAddress')(sequelize, Sequelize);

db.department = require('../models/department')(sequelize, Sequelize);
db.parentCategory = require('../models/parentCategory')(sequelize, Sequelize);
db.category = require('../models/category')(sequelize, Sequelize);

//Relations
db.otp.belongsTo(db.user);
db.user.hasMany(db.otp);

db.shippingAddress.belongsTo(db.user);
db.user.hasMany(db.shippingAddress);

db.parentCategory.belongsTo(db.department);
db.department.hasMany(db.parentCategory);

db.category.belongsTo(db.parentCategory);
db.parentCategory.hasMany(db.category);




module.exports = db;