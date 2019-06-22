module.exports = function(sequelize, Sequelize) {
    // user
      var status = sequelize.define('status', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        status:{
          type: Sequelize.TEXT,
          defaultValue: 'none'
        },
        description: {
          type:Sequelize.STRING,
          notNull: true,
          notEmpty: true
        }
      });
          return status;
    }