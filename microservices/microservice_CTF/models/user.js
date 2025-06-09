
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    // Many-to-Many: User <--> Role
    User.belongsToMany(models.Role, {
      through: 'user_roles',
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'roles'
    });

    // One-to-Many: User --> ResourceAccess
    User.hasMany(models.ResourceAccess, {
      foreignKey: 'user_id',
      as: 'resourceAccesses',
      onDelete: 'CASCADE',
      hooks: true
    });

    // One-to-Many: User --> Submission
    User.hasMany(models.Submission, {
      foreignKey: 'user_id',
      as: 'submissions',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  return User;
};
