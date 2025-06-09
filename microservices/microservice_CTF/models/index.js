
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all models
db.UserScore = require('./score')(sequelize, DataTypes);
db.User = require('./user')(sequelize, DataTypes);
db.Role = require('./role')(sequelize, DataTypes);
db.Submission = require('./submission')(sequelize, DataTypes);
db.Problem = require('./problem')(sequelize, DataTypes);
db.Room = require('./room')(sequelize, DataTypes);
db.ResourceAccess = require('./resourceAccess')(sequelize, DataTypes);

// Call associate methods if they exist
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

module.exports = db;
