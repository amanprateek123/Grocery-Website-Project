const Sequelize = require('sequelize')
require('dotenv').config()

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DIALECT || 'mariadb'
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.user = require('../models/user')(sequelize, Sequelize);
db.product = require('../models/product')(sequelize, Sequelize);
db.otp = require('../models/otp')(sequelize, Sequelize);
db.shippingAddress = require('../models/shippingAddress')(sequelize, Sequelize);

db.department = require('../models/department')(sequelize, Sequelize);
db.parentCategory = require('../models/parentCategory')(sequelize, Sequelize);
db.category = require('../models/category')(sequelize, Sequelize);

// Relations - creates respective Foreign Keys as [ownerTable]Id 
db.otp.belongsTo(db.user, { foreignKey: 'userId' });
db.user.hasMany(db.otp, { as: 'otps', foreignKey: 'userId' });

db.shippingAddress.belongsTo(db.user, { foreignKey: 'userId' });
db.user.hasMany(db.shippingAddress, { as: 'shippingAddresses', foreignKey: 'userId' });

db.parentCategory.belongsTo(db.department, { foreignKey: 'departmentId' });
db.department.hasMany(db.parentCategory, { as: 'parentCategories', foreignKey: 'departmentId' });

db.category.belongsTo(db.parentCategory, { foreignKey: 'parentCategoryId' });
db.parentCategory.hasMany(db.category, { as: 'categories', foreignKey: 'parentCategoryId' });




module.exports = db;