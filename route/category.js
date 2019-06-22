var Category = require('../models').category;
var cerrors = require('../helpers/custom-errors');

module.exports = function(app) {

// CREATE
// READ ALL
  app.get('/categories', (req, res) => {
    console.log("GET CATEGORIES")
    Category.findAll( { attributes: { exclude: ['createdAt','updatedAt','status'] } } )
    .then( result => {
      console.log(result)
      if(result) {
        res.status(200).json(result) 
      } else {
        res.json({ code: 200, result: 'No data'}) 
      }
    })
    .catch( err => {
      let e = cerrors.err();
      res.json({ errors: e })
    })
  })
//READ ONE by id, you can change the filter.
  app.get('/category/:id', (req, res) => {
    Category.findByPk(req.params.id , { attributes: { exclude: ['createdAt','updatedAt','status'] } })
    .then( result => { 
      if(result) {
        res.json({ code: 200, result}) 
      } else {
        res.json({ code: 200, result: 'No data'}) 
      }
    }).catch( err => { res.json( err ) })
  })
//BEST 5
  app.get('/categories/top', (req, res) => {
    
  })
// UPDATE
// DELETE
}
