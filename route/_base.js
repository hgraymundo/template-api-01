var Account = require('../models').account;
var cerrors = require('../helpers/custom-errors');

module.exports = function(app) {

// CREATE
  app.post('/account/new', (req, res) => {
    console.log("IN NEW ACCOUNT");
    console.log(req.body);
    req.checkBody("email", 'The email field is required').isEmail().withMessage("The email field is not valid");
    req.checkBody("firstname", 'The firstname field is required').notEmpty().isLength({ min: 3 }).trim().escape().withMessage('The firstname field requires 3 characters minimum');
    req.checkBody("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).trim().withMessage('The password must be between 6-15 characters long, with at least one uppercase and one number.');
    req.checkBody("confirm_password","The confirmation of the password does not match the password").equals(req.body.password);
    var errors = req.validationErrors();
    if(errors) {
      let e = cerrors.getErrors(errors, "default");
      res.json({ errors: e });
    } else {
      let { firstname, email, password } = req.body;
      Account.create({
        firstname,
        email,
        password
      }).then( result => {
        res.json({ result });
      }).catch( err =>{
        console.log(err);
        let e = cerrors.getErrors(err);
        res.json({ errors: e });
      })
    }
  })
//READ ALL
  app.get('/accounts', (req, res) => {
    Account.findAll( { attributes: { exclude: ['password'] } } ).then( result => {
      res.json( result );
    }) .catch( err => {
      let e = cerrors.err();
      res.json({ errors: e })
    })
  })
//READ ONE by id, you can change the filter.
  app.get('/account/:id', (req, res) => {
    Account.findByPk(req.params.id , { attributes: { exclude: ['password'] } })
    .then( result => { res.json(result) }).catch( err => { res.json( err ) })
  })
// UPDATE
  app.put('/account/:id', (req, res) => {
    let { email } = req.body;
    let id = req.params.id;
    Account.findByPk(req.params.id)
    .then( account => {
      return account.update({ email })
      .then(()=> res.json( account ))
      .catch( err => {
        let e = cerrors.err();
        res.json({ errors: e })
      })
    })
    .catch( err => {
      res.json( err );
    })
  })
//
  app.delete('/account/:id', (req, res) => {
    Account.destroy({ where: { uuid: req.params.id } })
    .then( result => {
      res.json( result );
    })
    .catch( err => {
      let e = cerrors.err();
      res.json({ errors: e })
    })
  })
}
