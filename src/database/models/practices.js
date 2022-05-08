'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Practices extends Model {
    static associate(models) {
      this.belongsTo(models.Character, { foreignKey: 'characterId', as: 'practices' });
    }
  }
  Practices.init({
    characterId: { type: DataTypes.STRING(8), primaryKey: true },
    wears: DataTypes.STRING,
    eats: DataTypes.STRING,
    buys: DataTypes.STRING,
    worksAt: DataTypes.STRING,
    playsAt: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Practices',
    modelName: 'Practices',
    timestamps: false,
  });
  return Practices;
};