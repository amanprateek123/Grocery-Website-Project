const db = require('../utils/database')

exports.getCategories = (req, res) => {
   db.department.findAll({
      attributes: ['id', 'name'],
      include: {
         model: db.parentCategory,
         attributes: ['id', 'name'],
         include: {
            model: db.category,
            attributes: ['id', 'name'],
         }
      }
   }).then(rows => {
      console.log(rows);
      res.json(rows)

   })
}