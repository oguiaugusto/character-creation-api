'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Physical extends Model {
    static associate(models) {
      this.belongsTo(models.Character, { foreignKey: 'characterId', as: 'physical' });
    }
  }
  Physical.init({
    characterId: { type: DataTypes.STRING(8), primaryKey: true },
    age: DataTypes.STRING,
    weight: DataTypes.STRING,
    height: DataTypes.STRING,
    health: DataTypes.STRING,
    ethnicity: DataTypes.STRING,
    hair: DataTypes.STRING,
    nationality: DataTypes.STRING,
    gender: DataTypes.STRING,
    sexuality: DataTypes.STRING,
    highlights: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Physicals',
    modelName: 'Physical',
    timestamps: false,
  });
  return Physical;
};