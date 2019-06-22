var bcrypt = require('bcryptjs');

module.exports = function(sequelize, Sequelize) {
// user
  var user = sequelize.define('user', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    photo:{
      type: Sequelize.TEXT,
      defaultValue: 'default'
    },
    firstname: {
      type:Sequelize.STRING,
      notNull: true,
      notEmpty: true
    },
    lastname: {
      type:Sequelize.STRING,
      notNull: true
    },
    mlastname: {
      type:Sequelize.STRING,
      notNull: true
    },
    birthday: {
      type:Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: 'The birthday field require the next format: YYYY-MM-DD'
        }
      }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'It is not a valid email.'
          },
        },
        unique: {
          msg: 'This email is already taken.'
        }
    },
    password: {
        type: Sequelize.STRING,
        notEmpty: true,
        notNull: true,
        len: [8,15]
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Inactive'
    },
    // account_type: {
    //   type: Sequelize.ENUM('Founder', 'Free','Premium'),
    //   defaultValue: 'Free'
    // },
    hash_activate: {
      type:Sequelize.TEXT,
      notNull: true
    },
    hash_recovery: {
      type:Sequelize.TEXT,
      notNull: true
    },
  },
    {
      hooks: {
        beforeCreate: (account) => {
          const salt = bcrypt.genSaltSync(13);
          account.password = bcrypt.hashSync(account.password, salt);
        }
      }
    }
  );
      return user;
}