'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserToken extends Model {
    static associate(models) {
      UserToken.belongsTo(models.User, {
        foreignKey: "user_id",
      })
    }
  }
  UserToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
    }, 
    {
      sequelize,
      modelName: 'UserToken',
      tableName: 'user_tokens',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return UserToken;
};