var Role = require('../models').role;
var User = require('../models').user;
var cerrors = require('../helpers/custom-errors');

module.exports = function(app) {
// Protected routes
  //read users by 
  app.get('/user', (req, res) => {
    User.findAll( { attributes: { exclude: ['createdAt','updatedAt'] } } )
    .then( result => {
      // res.json( result );
      console.log(result);
      res.render('pages/user/list', { users: result });
    })
    .catch( err => {
      let e = cerrors.getErrors(err);
      res.json({ errors: e })
    })
  })

  //read template for new user
  app.get('/new-user', (req, res) => {
    Role.findAll( { attributes: { exclude: ['createdAt','updatedAt'] } } )
    .then( result => {
      //res.json( result );
      console.log(result);
      res.render('pages/user/new', { roles: result });
    })
    .catch( err => {
      let e = cerrors.err();
      res.json({ errors: e })
    })
  })
  
  //validarte creation of a new user
  app.post('/create-user', (req, res) => {
    console.log(req.body);
    //Validations
    req.checkBody("firstname",'Firstname is required, 3 characters minimum').isLength({ min: 3 }).trim().escape();
    req.checkBody("lastname", 'Lastname is required, 3 characters minimum').isLength({ min: 3 }).trim().escape();
    req.checkBody("email", 'Email is required').isEmail().withMessage("E-mail not valid");
    req.checkBody("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/).trim().withMessage('The password must be between 6-15 characters long, with at least one uppercase and one number.');
    req.checkBody("repeat-password","The confirmation of the password does not match the password").equals(req.body.password);
    req.checkBody("role").isUUID().withMessage("The field role is required");
    
    var errors = req.validationErrors();

    if(errors) {
      let e = cerrors.getErrors(errors, "default");
      Role.findAll( { attributes: { exclude: ['createdAt','updatedAt'] } } )
      .then( result => {
        res.render('pages/user/new', { roles: result, data: req.body, errors: e });
      })
      .catch( err => {
        let e = cerrors.err();
        //send error to support team
        res.render('pages/user/new', { roles: result, data: req.body });
      })
      
    } else {
        let { firstname, lastname, email, password } = req.body;
        let role_id = req.body.role;
        User.create({ firstname, lastname, email, password, role_id })
          .then( result => {
            Role.findAll( { attributes: { exclude: ['createdAt','updatedAt'] } } )
              .then( result => {
                let messages = {
                  msg:'Successful operation'
                }
                res.render('pages/user/new', { roles: result, messages  });
              })
              .catch( err => {
                let e = cerrors.err();
                res.json({ errors: e })
              })
          })
          .catch( err =>{
            let e = cerrors.getErrors(err);
            Role.findAll( { attributes: { exclude: ['createdAt','updatedAt'] } } )
              .then( result => {
                res.render('pages/user/new', { roles: result, data: req.body, errors: e });
              })
              .catch( err => {
                let e = cerrors.err();
                // res.render('pages/user/new', { roles: result, data: req.body, errors: e });
              });
          })
    }

  })

} //end
