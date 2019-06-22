var Company = require('../models').company;
var cerrors = require('../helpers/custom-errors');
var Category = require('../models').category;
var SubCategory = require('../models').subcategory;

module.exports = function(app) {
  // CREATE
  app.post('/company', (req, res) => {
    console.log("NEW COMPANY");
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
  app.get('/companies', (req, res) => {
    Company.findAll({ attributes: ['uuid', 'name','shortDescription', 'description', 'logo', 'twitter','facebook','instagram','status'],
      include: [
        {
          model: SubCategory,
          attributes:['uuid','name'],
          include: [
            {
              model: Category,
              attributes:['uuid','name'],
            }
          ]
        }
      ]
    })
    .then( result => {
      //console.log(result.getCategories())
      console.log(result);
      res.json(result);
    })
    .catch( err => {
      let e = cerrors.getErrors(err);
      res.json({ errors: e });
    })
  })
//READ ONE by id, you can change the filter.
  app.get('/company/:id', (req, res) => {
    Company.findByPk(req.params.id, { attributes: ['uuid', 'name','shortDescription', 'description', 'logo', 'twitter','facebook','instagram','status'],
      include: [
        {
          model: SubCategory,
          attributes:['uuid','name'],
          include: [
            {
              model: Category,
              attributes:['uuid','name'],
            }
          ]
        }
      ]
    })
    .then( result => {
      //console.log(result.getCategories())
      console.log(result);
      res.json(result);
    })
    .catch( err => {
      let e = cerrors.getErrors(err);
      res.json({ errors: e });
    })

  })
// UPDATE
  app.put('/company/:id', (req, res) => {
    // add in where clause the ownerid
    console.log("IN UPDATE COMPANY")
    let { shortDescription, description, twitter, facebook, instagram } = req.body;
    let id = req.params.id;
    // add in where clause the ownerid
    Company.findByPk(req.params.id)
    .then( company => {
      return company.update({ shortDescription, description, twitter, facebook, instagram })
      .then(()=> res.json( company ))
      .catch( err => {
        let e = cerrors.err();
        res.json({ errors: e })
      })
    })
    .catch( err => {
      res.json( err );
    })
  })

} //end
