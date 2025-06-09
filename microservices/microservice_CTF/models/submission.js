
module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      }
    },
    problem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'problems',
        key: 'id',
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: '',
    },
    user_flag: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    memory_usage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    execution_time: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: true,
    },
    verdict: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    accept_percent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    }
  }, {
    tableName: 'submissions',
    timestamps: false
  });

  Submission.associate = (models) => {
    Submission.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    
    Submission.belongsTo(models.Problem, {
      foreignKey: 'problem_id',
      as: 'problem'
    });
  };

  return Submission;
};
