const db = require('../utils/database')
const Op = require('sequelize').Op;

const PAGINATION = 2;

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

exports.getProducts = (req, res) => {

   let where = {};
   let catWhere = {};
   req.query.id ? (where.id = req.query.id) : null;
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

   if (req.query.filter) {
      let filter = req.query.filter.split(',');
      let values = filter.map(f => f.split(':')[1])
      where['$skus.attributes.value$'] = {
         [Op.in]: values
      }
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
            '$skus.description$': {
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
   let order = req.query.order || 'createdAt';
   let dir = req.query.dir || 'DESC';

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
               ]
            },
         ],
         raw: true,
         nest: true
      });
   }).then(skus => {
      result.meta.skus = skus;

      return db.product.findAll({
         offset, limit, where,
         order: [[order, dir]],
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
               ]
            },
         ]
      })
   }).then(products => {
      let productIds = products.map(p => p.id);
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
               }
            },
            {
               model: db.sku,
               required: true,
               include: [
                  {
                     model: db.image,
                     attributes: ['id', 'src'],
                  },
                  {
                     model: db.attribute,
                     attributes: ['name', 'value']
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

exports.cart = (req, res) => {
   // Expects {skuId, action: (add,remove,delete)}
   // User has to be authenticated in middleware isAuth >> req.userId is available at this point.

   switch (req.body.action) {
      case 'add':
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
               db.cart.update({
                  quantity: cartItem.quantity + 1,
               }, {
                  where: {
                     id: cartItem.id
                  },
               }).then(async result => {
                  result = await db.cart.findByPk(cartItem.id, {
                     include: {
                        model: db.sku,
                        attributes: ['type', 'name', "description", 'price', 'id'],
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
                  return res.json(result)
               }).catch(err => res.status(500).json(err)) // ! don't send error report to user  
            } else {
               // new product in the cart
               db.cart.create({
                  userId: req.userId,
                  skuId: req.body.skuId,
                  quantity: 1,
               }).then(async result => {
                  let response = await db.cart.findByPk(result.id, {
                     include: {
                        model: db.sku,
                        attributes: ['type', 'name', "description", 'price', 'id'],
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
                  return res.json(response)
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
                           attributes: ['type', 'name', "description", 'price', 'id'],
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
                     return res.json(result);
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
         attributes: ['type', 'name', "description", 'price', 'id'],
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

      // cart.filter(ci => !ci.sku).map(deleted => deleted.destroy().then(del => console.log(' >> Deleted cartId', del.id, ' as the product was deleted')))

      // cart = cart.filter(ci => ci.sku)

      return res.json(cart);
   }).catch(err => {
      return res.status(500).json(err);
   })
}

exports.createOrder = (req, res) => {
   // AddressId, UserId,

   res.json({ status: 200, message: "Order Placed Successfully" })
}



exports.getOrders = (req, res) => {
   let where = {}
   let limit = 5
   let offset = (parseInt(req.query.page) - 1) * limit
   req.query.id ? (where.id = req.query.id) : null
   db.order.findAll({
      where: {
         userId: req.userId,
         ...where
      },
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
            }
         },
         {
            model: db.shippingAddress
         }
      ]
   }).then(orders => {
      res.json(orders);
   })
}