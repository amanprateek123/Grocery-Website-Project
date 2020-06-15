const db = require('../utils/database')
const Op = require('sequelize').Op;

const PAGINATION = 4;

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
            '$category.name$': {
               [Op.like]: `%${search}%`
            }
         },
         // {
         //    '$skus.name$': {
         //       [Op.like]: `%${search}%`
         //    }
         // },
         // {
         //    '$skus.description$': {
         //       [Op.like]: `%${search}%`
         //    }
         // },
         // {
         //    '$skus.json$': {
         //       [Op.like]: `%${search}%`
         //    }
         // }

      ];

   }

   let page = req.query.page || 0;
   let offset = page * PAGINATION;
   offset += (parseInt(req.query.skip) || 0);
   let limit = parseInt(req.query.limit) || PAGINATION;
   let order = req.query.order || 'createdAt';
   let dir = req.query.dir || 'DESC';

   db.product.findAll({
      offset, limit, where,
      // subQuery: false,
      order: [[order, dir]],

      include: [
         {
            model: db.category,
            attributes: ['id', 'name'],
            required: true
         },
         {
            model: db.sku,
            include: {
               model: db.image,
               attributes: ['id', 'src'],
            }
         },
      ]
   }).then(rows => {
      // console.log(rows);
      res.json(rows)
   })
}