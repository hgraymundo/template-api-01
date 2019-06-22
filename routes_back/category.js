var Account = require('../models').account;
var cerrors = require('../helpers/custom-errors');

module.exports = function(app) {
// Protected routes
  //read users by 
  app.get('/initial/account/create', (req, res) => {
    Account.findAndCountAll()
      .then( result => {
        if(result.count > 0 ) {
          res.json({msg: "Existe una cuenta registrado y solo puede existir una"})
        } else {
          res.render("account/new");
        }
      })   
  })

  //validarte creation of a new user
  app.post('/initial/account/create-account', (req, res) => {
    Account.findAndCountAll()
    .then(result => {
      if(result.count > 0) { //no create account, only one account
        console.log(result.count)
        let e = cerrors.getErrors("personalized");
        res.render('account/new', { errors: e });
      } else { //create account
        req.checkBody("firstname",'Firstname is required, 3 characters minimum').isLength({ min: 3 }).trim().escape();
        req.checkBody("lastname", 'Lastname is required, 3 characters minimum').isLength({ min: 3 }).trim().escape();
        req.checkBody("email", 'Email is required').isEmail().withMessage("E-mail not valid");
        req.checkBody("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).trim().withMessage('The password must be between 6-15 characters long, with at least one uppercase and one number.');
        req.checkBody("repeat-password","The confirmation of the password does not match the password").equals(req.body.password);
        req.checkBody("terms").equals('on').withMessage("You are required to accept the terms and conditions");
        var errors = req.validationErrors();
        if(errors) {
          let e = cerrors.getErrors(errors, "default");
          res.render('account/new', { data: req.body, errors: e });
        } else {
          let { firstname, lastname, email, password, terms } = req.body;
          Account.create({ firstname, lastname, email, password })
            .then( result => {
              let messages = {
                msg:'Your account has been created successfully, an activation email has been sent'
              }
              res.render('account/new', { messages, estatus: 200 });
            })
            .catch( err => {
              let e = cerrors.getErrors(err);
              res.render('account/new', { errors: e });
            })
        }
      } // else end
    })
    .catch(err => { // send err to sysadmin
      let e = cerrors.getErrors(err);
      res.render('account/new', { errors: e });
    })
  });

} //end
