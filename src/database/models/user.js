'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    id: { type: DataTypes.STRING(8), primaryKey: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
  });
  return User;
};
