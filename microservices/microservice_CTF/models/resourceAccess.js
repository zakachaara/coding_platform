
module.exports = (sequelize, DataTypes) => {
  const ResourceAccess = sequelize.define('ResourceAccess', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    resource_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'resource_access',
    timestamps: false
  });

  ResourceAccess.associate = (models) => {
    ResourceAccess.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };

  return ResourceAccess;
};
