module.exports = function(sequelize, Sequelize) {
  var schedule = sequelize.define('schedule', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    day: {
      type: Sequelize.ENUM('lun','mar', 'mie','jue','vie','sab','dom'),
      defaultValue: 'Active'
    },
    open: {
      type: Sequelize.STRING,
      notNull: true,
      notEmpty: true,
    },
    close: {
      type: Sequelize.STRING,
      notNull: true,
      notEmpty: true,
    }
  });
      return schedule;
}
