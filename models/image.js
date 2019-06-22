module.exports = function(sequelize, Sequelize) {
  var image = sequelize.define('image', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.TEXT,
      notNull: true,
      notEmpty: true,
    },
    status: {
      type: Sequelize.ENUM('Active','Inactive'),
      defaultValue: 'Active'
    },
  });
      return image;
}
