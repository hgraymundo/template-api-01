var bcrypt = require('bcryptjs');
// import { bcrypt } from 'bcryptjs';

module.exports = function(sequelize, Sequelize) {
  var medico = sequelize.define( 'medico', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    photo:{
      type: Sequelize.TEXT,
      defaultValue: 'default'
    },
    name: {
      type: Sequelize.STRING    
    },
    lastname: {
      type: Sequelize.STRING
    },
    mlastname: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: 'The birthday field require the next format: YYYY-MM-DD.'
        }
      }
    },
    cellphone: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.ENUM('MEDICO GENERAL', 'CARDIOLOGO','PEDIATRA'),
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Inactive'
    },
  }
  );
  return medico;
}