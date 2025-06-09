const { defaultValueSchemable } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    flag: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    initial_score: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    time_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    memory_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rooms', 
        key: 'id'
      },
      defaultValue: 3,

    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'problems',
    timestamps: false
  });

  return Problem;
};
