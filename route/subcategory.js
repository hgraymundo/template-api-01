var SubCategory = require('../models').subcategory;
var cerrors = require('../helpers/custom-errors');

module.exports = function(app) {
// CREATE
// READ ALL
  app.get('/subcategories/by/category/:id', (req, res) => {
    SubCategory.findAll({ where: { category_id: req.params.id }, attributes: { exclude: ['createdAt','updatedAt','status'] } }  ).then( result => {
      if(result) {
        res.json( result );
      } else {
        res.json({ result:''})
      }
    }) .catch( err => {
      let e = cerrors.err();
      res.json({ errors: e })
    })
  })
//READ ONE by id, you can change the filter.
  app.get('/subcategory/:id', (req, res) => {
    SubCategory.findByPk(req.params.id , { attributes: { exclude: ['createdAt','updatedAt','status'] } })
    .then( result => { res.json(result) }).catch( err => { res.json( err ) })
  })
// UPDATE
// DELETE
}
