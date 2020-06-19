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