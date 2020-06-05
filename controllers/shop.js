const db = require('../utils/database')

exports.getCategories = (req, res) => {
   db.department.findAll({
      attributes: ['id', 'name'],
      include: {
         model: db.parentCategory,
         as: 'parentCategories',
         attributes: ['id', 'name'],
         include: {
            model: db.category,
            as: 'categories',
            attributes: ['id', 'name'],
         }
      }
   }).then(rows => {
      console.log(rows);
      res.json(rows)

   })
}