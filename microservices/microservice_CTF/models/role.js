
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.ENUM('ROLE_USER', 'ROLE_ADMIN'),
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });

  Role.associate = (models) => {
    // Many-to-Many with User
    Role.belongsToMany(models.User, {
      through: 'user_roles',
      foreignKey: 'role_id',
      otherKey: 'user_id',
      as: 'users'
    });
  };

  return Role;
};
