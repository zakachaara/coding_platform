module.exports = (sequelize, DataTypes) => {
const UserScore = sequelize.define('UserScore', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
        model: 'users', // assumes you have a Rooms model or table named 'rooms'
        key: 'id'
      }
  },
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'problems', // assumes you have a Rooms model or table named 'rooms'
      key: 'id'
    }
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'user_problem_score',
  timestamps: false,
  indexes: [
    {
      name: 'user_problem_score_pkey',
      fields: ['user_id','problem_id']
    }
  ]
});
return UserScore;
 }
