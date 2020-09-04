const Sequelize = require('sequelize')
require('dotenv').config()

// console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: process.env.DIALECT || 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT0'
    }
})

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Disable logging.
sequelize.options.logging = false;


// Models/tables
db.user = require('../models/user')(sequelize, Sequelize);
db.otp = require('../models/otp')(sequelize, Sequelize);
db.shippingAddress = require('../models/shippingAddress')(sequelize, Sequelize);

db.department = require('../models/department')(sequelize, Sequelize);
db.parentCategory = require('../models/parentCategory')(sequelize, Sequelize);
db.category = require('../models/category')(sequelize, Sequelize);

db.product = require('../models/product')(sequelize, Sequelize);
db.sku = require('../models/sku')(sequelize, Sequelize)
db.image = require('../models/image')(sequelize, Sequelize)
db.attribute = require('../models/attribute')(sequelize, Sequelize)

db.cart = require('../models/cart')(sequelize, Sequelize)

db.order = require('../models/order')(sequelize, Sequelize);
db.orderItem = require('../models/orderItem')(sequelize, Sequelize);
db.status = require('../models/status')(sequelize, Sequelize);

db.homepage = require('../models/homepage')(sequelize, Sequelize)

db.offers = require('../models/offers')(sequelize, Sequelize)

db.shipping = require('../models/shipping')(sequelize, Sequelize) // to Track shipping with delivery guys.



// Relations - creates respective Foreign Keys as [ownerModel]Id 

db.otp.belongsTo(db.user, { onDelete: 'CASCADE' });
db.user.hasMany(db.otp);

db.shippingAddress.belongsTo(db.user, { onDelete: 'CASCADE' });
db.user.hasMany(db.shippingAddress);


db.parentCategory.belongsTo(db.department, { onDelete: 'CASCADE' });
db.department.hasMany(db.parentCategory);

db.category.belongsTo(db.parentCategory, { onDelete: 'CASCADE' });
db.parentCategory.hasMany(db.category);

db.product.belongsTo(db.category);
db.category.hasMany(db.product);

db.sku.belongsTo(db.product, { onDelete: 'CASCADE' });
db.product.hasMany(db.sku);

db.image.belongsTo(db.sku, { onDelete: 'CASCADE' });
db.sku.hasMany(db.image);

db.attribute.belongsTo(db.sku, { onDelete: 'CASCADE' });
db.sku.hasMany(db.attribute);

// Cart
db.cart.belongsTo(db.user, { onDelete: 'CASCADE' });
db.user.hasMany(db.cart);

db.cart.belongsTo(db.sku);
db.sku.hasMany(db.cart);


// Orders
db.orderItem.belongsTo(db.order, { onDelete: 'CASCADE' });
db.order.hasMany(db.orderItem);

db.order.belongsTo(db.user);
db.user.hasMany(db.order);

db.orderItem.belongsTo(db.sku)
db.sku.hasMany(db.orderItem)

db.order.belongsTo(db.status);
db.status.hasMany(db.order);

// shipping
db.user.hasMany(db.shipping);
db.order.hasOne(db.shipping);

module.exports = db;