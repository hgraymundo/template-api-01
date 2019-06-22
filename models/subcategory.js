module.exports = function(sequelize, Sequelize) {
  var subcategory = sequelize.define('subcategory', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      notNull: true
    },
    description: {
      type: Sequelize.TEXT,
      notNull: true
    },
    photo: {
      type: Sequelize.TEXT,
      notNull: true,
      defaultValue: 'default'
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active'
    }
  },
);
      return subcategory;
}
