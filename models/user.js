'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Provider, {
        foreignKey: "user_id",
      });

      User.hasMany(models.UserToken, {
        foreignKey: "user_id",
      })
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
  return User;
};