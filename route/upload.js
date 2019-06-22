var fs = require('fs-extra'),
    directory = require('../helpers/path_directories'),
    cerrors = require('../helpers/custom-errors'),
    Company = require('../models').company,
    Account = require('../models').account,
    Image = require('../models').image,
    file_path = require('../helpers/path_file'),
    Sequelize = require("sequelize");

module.exports = (app) =>  {
  // upload logo company
  app.post('/upload-logo-company/:id', (req, res) => {
    // TODO: checar cuando viene vacio no se ha resuelto regresar un error personalizado
    if (Object.keys(req.files).length == 0 ) {
      return res.status(400).send('No files were uploaded.');
    } else {
      let sampleFile = req.files.logo_company;
      fs.ensureDir( directory.LOGO_COMPANY + req.params.id , err => {
        if(err) {
          console.log(err);
        } else {
          sampleFile.mv(directory.LOGO_COMPANY + req.params.id +'/'+ sampleFile.name, function(err) {
            if (err) {
              res.json(err);
            } else {
              Company.findByPk(req.params.id)
              .then( company => {
                let logo = sampleFile.name;
                return company.update({ logo })
                .then(()=> res.json(directory.LOGO_COMPANY + req.params.id + '/' + sampleFile.name))
                .catch( err => {
                  let e = cerrors.getErrors(err);
                  res.json({ errors: e })
                })
              })
              .catch( err => {
                res.json( err );
              })
            }
          });
        }
      })
    }
  })
  //
  app.post('/upload-image-company/:id', (req, res) => {
    // TODO: checar cuando viene vacio no se ha resuelto regresar un error personalizado
    if (Object.keys(req.files).length == 0 ) {
      return res.status(400).send('No files were uploaded.');
    } else {
      Company.findByPk(req.params.id,
      {
        include: [
          { model: Image },
          {
            model: Account,
            attributes: { exclude: ['password','createdAt','updatedAt','status'] }

          }
        ],
      })//Validar que exista la empresa
      .then(company => {
        console.log(company)
        console.log(company.images.length)
      }).catch( err => {
        let e = cerrors.getErrors(err);
        res.json({ errors: e })
      })
    }
  })
  //
  app.post('/upload-photo-account/:id', (req, res) => {
    if (Object.keys(req.files).length == 0 ) {
      return res.status(400).send('No files were uploaded.');
    } else {
      let sampleFile = req.files.photo_account;
      fs.ensureDir( directory.ACCOUNT_PHOTO + req.params.id , err => {
        if(err) {
          console.log(err);
        } else {
          file_path.validate_file_exist(req.params.id);
          sampleFile.mv(directory.ACCOUNT_PHOTO + req.params.id +'/'+ sampleFile.name, function(err) {
            if (err) {
              res.json(err);
            } else {
              Account.findByPk(req.params.id)
              .then( account => {
                let photo = sampleFile.name;
                return account.update({ photo })
                .then(()=> res.json(directory.ACCOUNT_PHOTO + req.params.id + '/' + sampleFile.name))
                .catch( err => {
                  let e = cerrors.getErrors(err);
                  res.json({ errors: e })
                })
              })
              .catch( err => {
                res.json( err );
              })
            }
          });
        }
      })
    }
  })

}
