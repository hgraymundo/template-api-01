module.exports = function(sequelize, Sequelize) {
// user
  var role = sequelize.define('role', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    role:{
      type: Sequelize.TEXT,
      defaultValue: 'none'
    },
    description: {
      type:Sequelize.STRING,
      notNull: true,
      notEmpty: true
    }
  });
      return role;
}