
require('dotenv').config()

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

let EMAILS = require('../utils/email');
let EMAILS_ON = false; // CONFIG
EMAILS_ON = !EMAILS.transporter ? false : EMAILS_ON;

const PAGINATION = 7; //CONFIG
// CONFIG
const deliveryCharges = (distance, price, weight = 0, extraCharges = 0) => {
   return parseInt(distance * 2) + weight * 0.5 + extraCharges;
}


const PDFDocument = require('pdfkit')

const db = require('../utils/database')
const { createInvoice } = require('../utils/createInvoice');
const sku = require('../models/sku');
const Op = require('sequelize').Op;


// Homepage

//get homepage data
exports.getHome = async (req, res) => {
   db.homepage.findAll({
      order: [['order', 'ASC']]
   }).then(data => res.json(data)).catch((err) => res.json(err))
}

//getOffers
exports.getOffers = async (req, res) => {
   db.offers.findAll({}).then(data => res.json(data)).catch(e => {
      res.json(e)
      console.log('error', e)
   })
}



// *** CATEGORIES

exports.getCategories = (req, res) => {
   db.department.findAll({
      attributes: ['id', 'name'],
      include: {
         model: db.parentCategory,
         attributes: ['id', 'name'],
         include: {
            model: db.category,
            attributes: ['id', 'name']
         }
      }
   }).then(rows => {
      // console.log(rows);
      res.json(rows)

   })
}


db.sku.hasMany(db.attribute, { as: 'A0' })
db.sku.hasMany(db.attribute, { as: 'A1' })
db.sku.hasMany(db.attribute, { as: 'A2' })
db.sku.hasMany(db.attribute, { as: 'A3' })
db.sku.hasMany(db.attribute, { as: 'A4' })
db.sku.hasMany(db.attribute, { as: 'A5' })
db.sku.hasMany(db.attribute, { as: 'A6' })
db.sku.hasMany(db.attribute, { as: 'A7' })
db.sku.hasMany(db.attribute, { as: 'A8' })
db.sku.hasMany(db.attribute, { as: 'A9' })

// *** PRODUCTS ... SEARCHING

exports.getProducts = (req, res) => {

   let where = {};
   let catWhere = {};
   req.query.id ? (where.id = req.query.id) : null;
   req.query.ids ? (where.id = { [Op.in]: JSON.parse(req.query.ids) }) : null;
   req.query.categoryId ? (where.categoryId = req.query.categoryId) : null;
   req.query.category ? (where['$category.name$'] = { [Op.like]: `%${req.query.category}%` }) : null;
   req.query.brand ? (where['$product.brand$'] = { [Op.in]: req.query.brand.split(',') }) : null;
   req.query.parentCategory ? (where['$category.parentCategory.name$'] = { [Op.like]: `%${req.query.parentCategory}%` }) : null;
   req.query.minPrice ? (where['$skus.price$'] = { [Op.gte]: parseInt(req.query.minPrice) }) : null;
   req.query.maxPrice ? (where['$skus.price$'] = { [Op.lte]: parseInt(req.query.maxPrice) }) : null;

   if (req.query.minPrice && req.query.maxPrice) {
      where['$skus.price$'] = {
         [Op.and]: [
            {
               [Op.gte]: parseInt(req.query.minPrice)
            },
            {
               [Op.lte]: parseInt(req.query.maxPrice)
            }
         ]
      }
   }

   let selfJoins = []
   if (req.query.filter) {
      let filter = req.query.filter.split(',');
      let keys = Array.from(new Set(filter.map(f => f.split(':')[0])))
      let values = filter.map(f => f.split(':')[1])

      keys.forEach((key, i) => {
         if (i > 9) return;
         selfJoins.push({
            model: db.attribute,
            attributes: [],
            as: 'A' + i
         })
         where[`$skus.A${i}.name$`] = key;
         where[`$skus.A${i}.value$`] = {
            [Op.in]: filter.filter(f => f.split(':')[0] == key).map(f => f.split(':')[1]) // ? can be improved
         };

      })


   }

   if (req.query.search) {
      let search = req.query.search.split(' ').join('%');

      where[Op.or] = [
         {
            name: {
               [Op.like]: `%${search}%`
            }
         },
         {
            description: {
               [Op.like]: `%${search}%`
            }
         },
         {
            brand: {
               [Op.like]: `%${search}%`
            }
         },
         {
            keywords: {
               [Op.like]: `%${search}%`
            }
         },
         {
            '$category.name$': {
               [Op.like]: `%${search}%`
            }
         },
         {
            '$skus.json$': {
               [Op.like]: `%${search}%`
            }
         },
         {
            '$skus.name$': {
               [Op.like]: `%${search}%`
            }
         },
         {
            '$skus.images.src$': {
               [Op.like]: `%${search}%`
            }
         },
      ];

   }




   let page = Math.max(parseInt(req.query.page) - 1, 0) || 0;
   let limit = parseInt(req.query.limit) || PAGINATION;
   let offset = page * limit;
   offset += (parseInt(req.query.skip) || 0);
   let dir = req.query.dir || 'DESC';
   let order = req.query.order ? [[db.Sequelize.literal(req.query.order), dir]] : [['createdAt', dir]];

   let result = { meta: {} };

   db.product.findAll({
      subQuery: false,
      nest: true,
      where,
      attributes: [[db.sequelize.fn('COUNT', db.Sequelize.literal('DISTINCT product.id')), 'count']],
      include: [
         {
            model: db.category,
            attributes: [],
            include: {
               model: db.parentCategory,
               attributes: [],
            }
         },
         {
            model: db.sku,
            attributes: [],
            include: [
               {
                  model: db.image,
                  attributes: [],
               },
               ...selfJoins
            ]
         }
      ],
      raw: true,
   }).then(([total]) => {
      result.meta.count = total.count;
      result.meta.pageCount = Math.ceil(total.count / limit);
      return db.product.findAll({
         subQuery: false,
         nest: true,
         where,
         attributes: [[db.Sequelize.literal('DISTINCT `category->parentCategory`.`name`'), 'name']],
         include: [
            {
               model: db.category,
               attributes: [],
               required: true,
               include: {
                  model: db.parentCategory,
                  attributes: [],
                  required: true,
               }
            },
            {
               model: db.sku,
               attributes: [],
               include: [
                  {
                     model: db.image,
                     attributes: [],
                  },
                  {
                     model: db.attribute,
                     attributes: []
                  },
                  ...selfJoins
               ]
            }

         ],
         raw: true,
         nest: true
      })
   }).then(parentCategories => {
      return db.parentCategory.findAll({
         subQuery: false,
         nest: true,
         attributes: ['name'],
         where: {
            name: {
               [Op.in]: parentCategories.map(c => c.name)
            }
         },
         include: {
            model: db.category,
            attributes: ['name']
         }

      })
   }).then(parentCategories => {
      result.meta.categories = parentCategories;
      return db.product.findAll({
         subQuery: false,
         nest: true,
         where,
         attributes: [[db.Sequelize.literal('DISTINCT `product`.`brand`'), 'name'], 'id'],
         include: [
            {
               model: db.category,
               attributes: [],
               include: {
                  model: db.parentCategory,
                  attributes: [],
               }
            },
            {
               model: db.sku,
               attributes: [],
               include: [
                  {
                     model: db.image,
                     attributes: [],
                  },
                  {
                     model: db.attribute,
                     attributes: []
                  },
                  ...selfJoins
               ]
            }
         ],
         raw: true,
         nest: true
      })
   }).then(brands => {
      result.meta.brands = brands;

      return db.product.findAll({
         subQuery: false,
         nest: true,
         where,
         attributes: [db.Sequelize.literal('DISTINCT `skus->attributes`.`value`'), 'skus->attributes.name'],
         include: [
            {
               model: db.category,
               attributes: [],
               include: {
                  model: db.parentCategory,
                  attributes: [],
               }
            },
            {
               model: db.sku,
               attributes: [],
               include: [
                  {
                     model: db.image,
                     attributes: [],
                  },
                  {
                     model: db.attribute,
                     attributes: [],
                  },
                  ...selfJoins
               ]
            },
         ],
         raw: true,
         nest: true
      });
   }).then(skus => {
      result.meta.skus = skus;
      console.log('>>> Fetching Product Ids.');
      return db.product.findAll({
         offset, limit, where,
         order,
         subQuery: false,
         nest: true,
         group: ['id'],
         attributes: ['id'],
         include: [
            {
               model: db.category,
               attributes: [],
               required: true,
               include: {
                  model: db.parentCategory,
                  attributes: ['id', 'name'],
                  required: true,
               }
            },
            {
               model: db.sku,
               attributes: [],
               required: true,
               include: [
                  {
                     model: db.image,
                     attributes: [],
                  },
                  {
                     model: db.attribute,
                     attributes: []
                  },
                  ...selfJoins
               ]
            },
         ]
      })
   }).then(products => {
      let productIds = products.map(p => p.id);
      console.log('>>> Getting Products Info.');

      return db.product.findAll({
         where: {
            id: {
               [Op.in]: productIds
            }
         },
         include: [
            {
               model: db.category,
               attributes: ['id', 'name'],
               required: true,
               include: {
                  model: db.parentCategory,
                  attributes: ['id', 'name'],
                  required: true,
                  include: {
                     model: db.department,
                     attributes: ['id', 'name'],
                  }
               }
            },
            {
               model: db.sku,
               required: true,
               include: [
                  {
                     model: db.image,
                     order: [['src', 'ASC']],
                     attributes: ['id', 'src'],
                  },
                  {
                     model: db.attribute,
                     attributes: ['id', 'name', 'value']
                  },

               ]
            },
         ]

      })
   }).then(products => {
      result.products = products;
      res.json(result);
   })
}

exports.predictiveSearch = (req, res) => {
   let query = req.query.q;
   db.product.findAll({
      where: {
         [Op.or]: [
            {
               name: {
                  [Op.like]: `%${query}%`
               }
            },
            {
               keywords: {
                  [Op.like]: `%${query}%`
               }
            }
         ]
      },
      include: [
         {
            model: db.sku,
            required: true,
            include: [
               {
                  model: db.image,
                  order: [['src', 'ASC']],
                  attributes: ['id', 'src'],
               },
               {
                  model: db.attribute,
                  attributes: ['id', 'name', 'value']
               },
            ]
         }
      ],
      limit: 10,
   }).then(products => {
      let strings = products.map(p => {
         return (
            { name: p.name, brand: p.brand, img: p.skus[0].images[0].src, price: p.skus[0].price }
         )
      });
      res.json(strings)
   })
}

// *** CART

exports.cart = async (req, res) => {
   // Expects {skuId,qty, action: (add,remove,delete)}
   // User has to be authenticated in middleware isAuth >> req.userId is available at this point.
   /**
    * Creates , removes , delete a cart item
    * @param skuId -- skuId of the product to be added to cart
    * @param qty -- quantity
    * @param action -- add | remove | delete
    * 
    * @returns cart -- on addition
    * @returns {status: 200 | 400  ,message: }
    * 
    */

   let qty = req.body.qty || 1;

   switch (req.body.action) {
      case 'add':
         let _sku = await db.sku.findByPk(req.body.skuId);
         if (!_sku) {
            return res.json({ status: 400, message: `No such Product SKU exists.` });
         }
         db.cart.findAll({
            where: {
               userId: req.userId,
               skuId: req.body.skuId
            },
            raw: true,
            nest: true,
         }).then(([cartItem]) => {
            if (cartItem) {
               // if the product is already in the user cart
               if (_sku.stockQuantity < Number(cartItem.quantity) + Number(req.body.qty)) {
                  return res.json({ status: 201, message: `Not in stock. Only ${_sku.stockQuantity} items in stock.` })
               }
               db.cart.update({
                  quantity: cartItem.quantity + qty,
               }, {
                  where: {
                     id: cartItem.id
                  },
               }).then(async result => {
                  result = await db.cart.findByPk(cartItem.id, {
                     include: {
                        model: db.sku,
                        attributes: ['name', 'price', 'id'],
                        include: [
                           {
                              model: db.product,
                              attributes: ['name', 'brand', 'id'],
                           },
                           {
                              model: db.image,
                              attributes: ['src'],
                           }
                        ]
                     }
                  })
                  return res.json({ status: 200, cartItem: result, message: 'Added Successfully.' })
               }).catch(err => res.status(500).json(err)) // ! don't send error report to user  
            } else {
               // new product in the cart

               if (_sku.stockQuantity < Number(req.body.qty)) {
                  return res.json({ status: 201, message: `Not in stock. Only ${_sku.stockQuantity} items in stock.` })
               }

               db.cart.create({
                  userId: req.userId,
                  skuId: req.body.skuId,
                  quantity: qty,
               }).then(async result => {
                  let ci = await db.cart.findByPk(result.id, {
                     include: {
                        model: db.sku,
                        attributes: ['name', 'price', 'id'],
                        include: [
                           {
                              model: db.product,
                              attributes: ['name', 'brand', 'id'],
                           },
                           {
                              model: db.image,
                              attributes: ['src'],
                           }
                        ]
                     }
                  })
                  return res.json({ status: 200, cartItem: ci, message: 'Added Successfully.' })
               }).catch(err => res.status(500).json(err)) // ! don't send error report to user
            }
         }).catch(err => res.status(500).json(err)) // ! don't send error report to user
         break;

      case 'remove':
         db.cart.findAll({
            where: {
               userId: req.userId,
               skuId: req.body.skuId
            },
            raw: true,
            nest: true,
         }).then(([cartItem]) => {
            if (cartItem) {
               // if the product is in the user cart
               if (cartItem.quantity > 1) {
                  db.cart.update({
                     quantity: cartItem.quantity - 1,
                  }, {
                     where: {
                        id: cartItem.id
                     }
                  }).then(async result => {
                     result = await db.cart.findByPk(cartItem.id, {
                        include: {
                           model: db.sku,
                           attributes: ['name', 'price', 'id'],
                           include: [
                              {
                                 model: db.product,
                                 attributes: ['name', 'brand', 'id'],
                              },
                              {
                                 model: db.image,
                                 attributes: ['src'],
                              }
                           ]
                        }
                     })
                     return res.json({ status: 200, cartItem: result, message: 'Removed from Cart.' });
                  }).catch(err => res.status(500).json(err)) // ! don't send error report to user  
               } else {
                  // only One product in the cart
                  db.cart.destroy({
                     where: {
                        id: cartItem.id,
                     }
                  }).then(result => res.json({ status: 200, message: "Deleted Successfully" })).catch(err => res.status(500).json(err)) // ! don't send error report to user
               }
            } else {
               // NO product in the cart BAD REQUEST
               res.json({ status: 400, message: 'NO Such Product in User Cart' })

            }
         }).catch(err => res.status(500).json(err)) // ! don't send error report to user
         break;

      case 'delete':
         db.cart.findAll({
            where: {
               userId: req.userId,
               skuId: req.body.skuId
            },
            raw: true,
            nest: true,
         }).then(([cartItem]) => {
            if (cartItem) {

               // Delete the cart Item
               db.cart.destroy({
                  where: {
                     id: cartItem.id,
                  }
               }).then(result => res.json({ status: 200, message: "Deleted Successfully" })).catch(err => res.status(500).json(err)) // ! don't send error report to user
            } else {
               // NO product in the cart BAD REQUEST
               res.json({ status: 400, message: 'NO Such Product in User Cart' })

            }
         }).catch(err => res.status(500).json(err)) // ! don't send error report to user
         break;

      default:
         return res.json({ status: 400, message: 'Invalid Cart Action' });

   }

}

exports.getCart = (req, res) => {
   // expects authenticated user >> req.useId
   db.cart.findAll({
      where: {
         userId: req.userId
      },
      include: {
         model: db.sku,
         attributes: ['name', 'price', 'id', 'stockQuantity', 'weight', 'extraCharges'],
         include: [
            {
               model: db.product,
               attributes: ['name', 'brand', 'id'],
            },
            {
               model: db.image,
               attributes: ['src'],
            }
         ]
      }
   }).then(cart => {
      // If there are some products in the cart which were DELETED by ADMIN
      // they need to be deleted from the cart.

      cart.filter(ci => !ci.sku).map(deleted => deleted.destroy().then(del => console.log(' >> Deleted cartId', del.id, ' as the product was deleted')))

      cart = cart.filter(ci => ci.sku)

      return res.json(cart);
   }).catch(err => {
      console.log(err);
      return res.status(500).json(err);

   })
}

// *** ORDERS

exports.getStatus = (req, res) => {
   db.status.findAll({
      attributes: ['id', 'index', 'status']
   }).then(status => res.json(status))
      .catch(err => {
         console.log(err);
         res.json([])
      })
}

exports.getOrders = (req, res) => {
   let where = {}
   let limit = 5;
   let offset = (parseInt(req.query.page) - 1) * limit || 0;
   req.query.id ? (where.id = req.query.id) : null
   req.query.date ? (where.createdAt = { [Op.gt]: new Date(req.query.date) }) : null
   db.order.findAll({
      where: {
         userId: req.userId,
         ...where
      },
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: limit,
      include: [
         {
            model: db.orderItem,
            include: {
               model: db.sku,
               include: [
                  {
                     model: db.product,
                  },
                  {
                     model: db.image
                  }
               ]
            },


         },
         {
            model: db.status,
            attributes: ['status', 'index']
         }
      ],
   }).then(orders => {
      // console.log(orders);
      res.json(orders);
   }).catch(err => {
      res.json(err)
      console.error(err);

   })
}

exports.cancelOrder = async (req, res) => {
   try {
      const order = await db.order.findByPk(req.body.id)
      if (order.userId === req.userId) {
         order.remarks = req.body.reason
         order.isCancelled = true
         await order.save()
         res.json({ order: order, message: "This order is cancelled" })
      }
      else {
         res.json({ status: 400, message: "NOT Authorized.! Order does not belong to you." })
      }
   }
   catch (e) {
      res.json(e.message)
   }
}

exports.postOrder = async (req, res) => {
   /*
      Authenticated User : `req.userId` is available.
      
      the whole cart will be added as order.
      total price will be calculated here based on products.
      order.status = ordered.

      instance order = {
         shippingAddress : Address,
         paymentType:  'COD' | 'PREPAID' ,
         verifyDelivery: boolean : // if true user will provide OTP to the Delivery Guy to mark the order Delivered.
      }

   */

   // Calculate the amount to pay.
   let price = 0;
   let order = {};
   let orderCart;
   let paymentDone = false;


   // if request was sent by STRIPE WEBHOOK on success full payment 
   const sig = req.headers['stripe-signature'];
   let event = null;
   if (sig) {
      try {
         event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);
         console.log('STRIPE WEBHOOK ');
      }
      catch (err) {
         console.log('NOT STRIPE');
         event = null;
      }
   }
   if (event) {
      if (event.type == 'charge.succeeded') {

         console.log(event);

         const paymentIntent = event.data.object;
         console.log('PAYMENT SUCCEEDED');


         order = JSON.parse(paymentIntent.metadata.order);
         req.userId = order.userId;
         order.statusId = 1;
         order.cancelled = null;
         let _address = await db.shippingAddress.findByPk(order.shippingAddress)
         _address = _address.toJSON();
         order.shippingAddress = JSON.stringify(_address);
         order.transactionId = paymentIntent.id;
         order.transactionStatus = paymentIntent.status;

         orderCart = JSON.parse(paymentIntent.metadata.orderCart);

         paymentDone = true;
      }
   }




   // Fetch Cart
   try {

      if (!paymentDone) {
         let cart = await db.cart.findAll({
            where: {
               userId: req.userId
            },
            include: {
               model: db.sku,
               include: {
                  model: db.product
               }
            }
         })

         // If there are some products in the cart which were DELETED by ADMIN
         // they need to be deleted from the cart.

         if (!cart.length) {
            let error = new Error('Your Cart is Empty!');
            error.status = 400;
            throw error;
         }

         // cart = cart.filter(ci => !ci.sku).map(deleted => deleted.destroy().then(del => console.log(' >> Deleted cartId', del.id, ' as the product was deleted')))
         orderCart = cart.filter(ci => {
            if (ci.sku) {
               if (ci.quantity > ci.sku.stockQuantity) {
                  let err = new Error(`Only ${ci.sku.stockQuantity} stocks left of ${ci.sku.product.name}. Please reduce quantity.`)
                  throw err;
               }
               return true;
            }
            console.log(`NOT in stock.${ci.quantity} vs ${ci.sku.stockQuantity}`);
            return false;
         })

         // 

         price = orderCart.reduce((acc, cur) => acc + cur.sku.price * Math.min(cur.quantity, cur.sku.stockQuantity), 0);
         let totalWeight = orderCart.reduce((acc, cur) => acc + cur.sku.weight * Math.min(cur.quantity, cur.sku.stockQuantity), 0);
         let totalExtraCharges = orderCart.reduce((acc, cur) => acc + cur.sku.extraCharges * Math.min(cur.quantity, cur.sku.stockQuantity), 0);
         console.log('ORDER PRICE >> ', price);

         let _address = await db.shippingAddress.findByPk(req.body.shippingAddress.id)
         _address = _address.toJSON();

         let shipping_charges = deliveryCharges(_address.distance, price, totalWeight, totalExtraCharges);


         let discount = 0;
         if (req.body.offer) {
            console.log('OFFER ', req.body.offer);
            let [offer] = await db.offers.findAll({ where: { offerCode: req.body.offer } })

            if (offer.discount) {
               if (price >= offer.minAmt) {
                  let startDate = new Date(offer.startDate);
                  let endDate = new Date(offer.endDate);
                  let today = new Date();
                  if (today > startDate && today < endDate) {
                     discount = price * offer.discount / 100;
                  }
               }
            }
         }

         let totalPrice = price + shipping_charges - discount;

         // PRICE CALCULATED

         order.shippingCharges = shipping_charges;
         order.discount = discount;
         order.price = totalPrice;
         order.shippingAddress = JSON.stringify(_address);
         order.paymentType = req.body.paymentType;
         order.verifyDelivery = req.body.verifyDelivery;
         order.userId = req.userId;
         order.statusId = 1;
         order.cancelled = null

         // // Expected Delivery Date
         // let date = new Date();
         // date.setDate(date.getDate() + 2)

         // order.deliverOn = date.toISOString();

         if (!orderCart.length) {
            let err = new Error('Cart Not Eligible for Order.');
            err.status = 400;
            throw err;
         }

         console.log(`Price : O ${price} + S ${shipping_charges} - D ${discount} = T  ${order.price}`);

         if (req.body.paymentType == 'PREPAID') {
            // generate online payment client secret and return to client to proceed with online payment

            orderCart = orderCart.map(oc => oc.toJSON());
            orderCart = orderCart.map(oc => ({ id: oc.id, quantity: oc.quantity, skuId: oc.skuId }));
            order.shippingAddress = _address.id;

            delete order.cancelled;
            delete order.statusId;

            console.log(orderCart);

            const paymentIntent = await stripe.paymentIntents.create({
               amount: totalPrice * 100,
               currency: 'inr',
               payment_method_types: ['card'],
               metadata: {
                  order: JSON.stringify(order),
                  orderCart: JSON.stringify(orderCart)
               },
            });

            console.log("PAYMENT INTENT : ", paymentIntent);
            res.json({
               payOnline: true,
               amount: totalPrice,
               clientSecret: paymentIntent.client_secret,
            })
            return;
         }

         else if (req.body.paymentType != 'COD') {
            res.json({
               status: 400,
               message: 'Invalid Payment Method'
            })
            return;
         }

      }

      // CREATE AN ORDER

      let _order = await db.order.create({
         ...order,

      })

      order = _order;
      let orderItems = []; // hold promises

      // Reduce Respective stockItems. and add them to orderItems
      orderCart.forEach((ci) => {
         orderItems.push(new Promise(async (resolve, reject) => {
            for (let i = 0; i < ci.quantity; i++) {
               await db.sku.findByPk(ci.skuId).then(async _sku => {
                  // if (+_sku.stockQuantity > 0) {
                  _sku.stockQuantity = _sku.stockQuantity - 1;
                  await _sku.save();
                  console.log(`Remaining Stock . ${_sku.stockQuantity}`);
                  db.orderItem.create({
                     orderId: _order.id,
                     skuId: ci.skuId,
                  })
                  // }
                  // else {
                  //    console.log(ci.skuId, ' is OUT OF STOCK.!');
                  // }
               })
            }
            resolve()
         }))

      })

      let result = await Promise.all(orderItems)

      order = await db.order.findByPk(order.id, {
         include: [
            {
               model: db.orderItem,
               include: {
                  model: db.sku,
                  include: [
                     {
                        model: db.product,
                     },
                     {
                        model: db.image,
                     }
                  ]
               },


            },
            {
               model: db.status,
               attributes: ['status', 'index']
            }
         ]
      })

      console.log(' >>> ORDER PLACED.');

      // EMAIL

      // EMPTY CART 
      db.cart.findAll({
         where: {
            userId: req.userId
         }
      }).then(cart => {
         cart.forEach(ci => ci.destroy())
      })
      res.json(order);

   }
   catch (err) {
      console.log(err);
      res.json({ message: err.message, status: err.status })
   }


}

// INVOICE

exports.getInvoice = async (req, res) => {
   let orderId = req.params.id;
   let filename = 'invoice-' + orderId;

   let order = await db.order.findByPk(orderId, {
      include: {
         all: true,
         nested: true
      },

   });

   if (order) {
      if (order.userId == req.userId) {
         res.setHeader('COntent-Type', 'application/pdf');
         res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"')

         order = order.toJSON();

         let filtered = [];
         for (let oi of order.orderItems) {
            let existing = filtered.find(foi => foi.skuId == oi.skuId);
            if (existing) {
               existing.quantity++;
            }
            else {
               filtered.push({ ...oi, quantity: 1 })
            }
         }

         order.orderItems = filtered;

         let doc = new PDFDocument({ size: 'A4', margin: 50 });

         doc.pipe(res);

         createInvoice(doc, order);


         doc.end();
      }
      else {
         res.status(401).end('NOT Authorized.')
      }
   }
   else {
      res.status(404).end('Order Not Found.');
   }


}
