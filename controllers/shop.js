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
            json: {
               [Op.like]: `%${search}%`
            }
         },
         {
            '$category.name$': {
               [Op.like]: `%${search}%`
            }
         },
      ];

   }

   let page = Math.max(parseInt(req.query.page) - 1, 0) || 0;
   let offset = page * PAGINATION;
   offset += (parseInt(req.query.skip) || 0);
   let limit = parseInt(req.query.limit) || PAGINATION;
   let order = req.query.order || 'createdAt';
   let dir = req.query.dir || 'DESC';

   let result = { meta: {} };

   db.product.findAll({
      where,
      attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('product.id')), 'count']],
      include: [
         {
            model: db.category,
            attributes: [],
            include: {
               model: db.parentCategory,
               attributes: [],
            }
         },
      ],
      raw: true,
   }).then(([total]) => {
      result.meta.pageCount = Math.ceil(total.count / PAGINATION);
      result.meta.count = total.count;
      return db.product.findAll({
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

         ],
         raw: true,
         nest: true
      })
   }).then(parentCategories => {
      return db.parentCategory.findAll({
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
         ],
         raw: true,
         nest: true
      })
   }).then(brands => {
      result.meta.brands = brands;

      return db.product.findAll({
         where,
         attributes: [db.Sequelize.literal('DISTINCT `skus`.`name`'), 'id'],
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
               include: {
                  model: db.image,
                  attributes: ['id', 'src'],
               }
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
                        attributes: ['type', 'name', "description", 'price'],
                        include: [
                           {
                              model: db.product,
                              attributes: ['name', 'brand'],
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
                        attributes: ['type', 'name', "description", 'price'],
                        include: [
                           {
                              model: db.product,
                              attributes: ['name', 'brand'],
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
                           attributes: ['type', 'name', "description", 'price'],
                           include: [
                              {
                                 model: db.product,
                                 attributes: ['name', 'brand'],
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
         attributes: ['type', 'name', "description", 'price'],
         include: [
            {
               model: db.product,
               attributes: ['name', 'brand'],
            },
            {
               model: db.image,
               attributes: ['src'],
            }
         ]
      }
   }).then(cart => {
      return res.json(cart);
   }).catch(err => {
      return res.status(500).json(err);
   })
}