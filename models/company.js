module.exports = function(sequelize, Sequelize) {
  var company = sequelize.define('company', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      notNull: false,
      unique: {
        msg: 'This company name is already in use.'
      }
    },
    shortDescription: {
      type: Sequelize.STRING,
      notNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      notNull: true
    },
    logo: {
      type: Sequelize.TEXT,
      notNull: true,
      defaultValue: 'default'
    },
    twitter: {
      type: Sequelize.STRING,
    },
    facebook: {
      type: Sequelize.STRING,
    },
    instagram: {
      type: Sequelize.STRING,
    },
    street: { 
      type: Sequelize.STRING
    },
    colony: {
      type: Sequelize.STRING
    },
    municipal: {
      type: Sequelize.STRING
    },
    noExt: {
        type: Sequelize.STRING
    },
    noInt: {
        type: Sequelize.STRING
    },
    postalCode:{
        type: Sequelize.STRING
    },
    state:{
      type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING,
        defaultValue: 'México'
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active'
    }
  },
);
      return company;
}
