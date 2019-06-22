var Sequelize = require("sequelize");
var sequelize = new Sequelize('buscamecomo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//
db.account  = require('./account.js')(sequelize, Sequelize);
// db.user  = require('./user.js')(sequelize, Sequelize);
// db.role  = require('./role.js')(sequelize, Sequelize);

// db.account.hasMany(db.user, { foreignKey: 'account_id', sourceKey: 'uuid'});
// db.user.belongsTo(db.account, { foreignKey: 'account_id', targetKey: 'uuid'});

// db.role.hasMany(db.user, { foreignKey: 'role_id', sourceKey: 'uuid'});
// db.user.belongsTo(db.role, { foreignKey: 'role_id', targetKey: 'uuid'});

db.category  = require('./category.js')(sequelize, Sequelize);
// db.subcategory  = require('./subcategory.js')(sequelize, Sequelize);


db.company  = require('./company.js')(sequelize, Sequelize);
// db.image  = require('./image.js')(sequelize, Sequelize);

// db.category  = require('./category.js')(sequelize, Sequelize);
// db.subcategory  = require('./subcategory.js')(sequelize, Sequelize);

// db.account.hasMany(db.company, { foreignKey: 'account_id', sourceKey: 'uuid'});
// db.company.belongsTo(db.account, { foreignKey: 'account_id', targetKey: 'uuid'});

// db.category.hasMany(db.subcategory, { foreignKey: 'category_id', sourceKey: 'uuid'});
// db.subcategory.belongsTo(db.category, { foreignKey: 'category_id', targetKey: 'uuid'});

// db.company.belongsToMany(db.category, { through: 'company_categories', foreignKey: 'company_id' })
// db.category.belongsToMany(db.company, { through: 'company_categories', foreignKey: 'category_id' })

// db.company.belongsToMany(db.subcategory, { through: 'company_subcategories', foreignKey: 'company_id' })
// db.subcategory.belongsToMany(db.company, { through: 'company_subcategories', foreignKey: 'subcategory_id' })

// db.company.hasMany(db.image, { foreignKey: 'company_id', sourceKey: 'uuid'});
// db.image.belongsTo(db.company, { foreignKey: 'company_id', targetKey: 'uuid'});
// db.company.belongsTo(db.account, { foreignKey: 'account_id', targetKey: 'uuid'});

module.exports = db;
