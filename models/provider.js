'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    static associate(models) {
      Provider.belongsTo(models.User, {
        foreignKey: "user_id",
      })
    }
  }
  Provider.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    provider: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Provider',
    tableName: 'providers',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Provider;
};