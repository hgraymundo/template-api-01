var Account = require('../models').account,
    Company = require('../models').company,
    Category = require('../models').category,
    db = require('../models');

var cerrors = require('../helpers/custom-errors'),
    directory = require('../helpers/path_directories');
    // fs = require('fs-extra');


module.exports = function(app) {
// CREATE
  app.post('/account/new', (req, res) => {
    console.log("NEW ACCOUNT");
    req.checkBody("email", 'El campo de correo electrónico es obligatorio').isEmail().withMessage("El campo de correo electrónico no es válido.");
    req.checkBody("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).trim().withMessage('La contraseña debe tener entre 6 y 15 caracteres, con al menos una mayúscula y un número.');
    req.checkBody("confirm_password","La confirmación de la contraseña no coincide con la contraseña.").equals(req.body.password);
    req.checkBody("terms","Es necesario aceptar los términos y condiciones.").equals('true');
    // req.checkBody("company_name").not().isEmpty().withMessage('The Company name field is required').not().matches(/^[nN]+[uU]+[lL]+[lL]$/).withMessage('Null in name field is not valid');
    // req.checkBody("category").not().isEmpty().withMessage('The Category field is require');
    // req.checkBody("subcategory").not().isEmpty().withMessage('The Sub Category field is require');
    console.log(req.body.terms)
    var errors = req.validationErrors();
    if(errors) {
      let e = cerrors.getErrors(errors, "default");
      console.log( e )
      res.status(400).json(e);
    } else {
      let { email, password, terms } = req.body;
      Account.create({ email, password, terms})
      .then( result => {
        console.log(result);
        let messages = [{ message: "Su cuenta se ha creado exitosamente, un correo electrónico de verificación y activación, se ha enviado."}];
        res.status(200).json( messages );
      })
      .catch( err => {
        console.log(err)
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
      })
    } //Whitout errors
  })
//READ ALL
//READ ONE by id, you can change the filter.
  app.get('/account/:id', (req, res) => {
      Account.findByPk(req.params.id , { attributes: { exclude: ['hash_recovery','hash_activate','password','createdAt','updatedAt','status'] } })
      .then( result => {
        if(result){
          res.json(result)
        } else {
          res.json({ result: ""})
        }
      })
      .catch( err => { res.json( err ) })
  })
// UPDATE
  app.put('/account/:id', (req, res) => {
    let { name, lastname, mlastname, birthday, cellphone } = req.body;
    let id = req.params.id;
    Account.findByPk(req.params.id, { attributes: { exclude: ['password','createdAt','updatedAt','status', 'hash_activate', 'hash_recovery'] } })
    .then( account => {
      return account.update({ name, lastname, mlastname, birthday, cellphone })
      .then(()=> {
        let messages = [{ message: 'Su cuenta se ha actualizado exitosamente.'}];
        res.status(200).json( messages )
      })
      .catch( err => {
        let e = cerrors.getErrors(err);
        res.status(400).json( e );
      })
    })
    .catch( err => {
      res.json( err );
    })
  })

//DELETE
  app.delete('/account/:id', (req, res) => {
    Account.destroy({ where: { uuid: req.params.id } })
    .then( result => {
      let messages = [{ message: 'Su cuenta se ha eliminado exitosamente.'}];
      res.status(200).json( messages );
    })
    .catch( err => {
      let e = cerrors.err();
      res.status(400).json( e );
    })
  })
}
