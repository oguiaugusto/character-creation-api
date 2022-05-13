'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class KeyPoints extends Model {
    static associate(models) {
      this.belongsTo(models.Character, { foreignKey: 'characterId', as: 'keyPoints' });
    }
  }
  KeyPoints.init({
    characterId: { type: DataTypes.STRING(8), primaryKey: true },
    goal: DataTypes.STRING,
    motivation: DataTypes.STRING,
    purpose: DataTypes.STRING,
    fears: DataTypes.STRING,
    virtues: DataTypes.STRING,
    flaws: DataTypes.STRING,
    peculiarities: DataTypes.STRING,
    love: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'KeyPoints',
    modelName: 'KeyPoints',
    timestamps: false,
  });
  return KeyPoints;
};
