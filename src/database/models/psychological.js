'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Psychological extends Model {
    static associate(models) {
      this.hasMany(models.Character, { foreignKey: 'storyId', as: 'psychological' });
    }
  }
  Psychological.init({
    characterId: { type: DataTypes.STRING(8), primaryKey: true },
    intelligence: DataTypes.STRING,
    temperament: DataTypes.STRING,
    selfKnowledge: DataTypes.STRING,
    habits: DataTypes.STRING,
    unconsciousAspects: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Psychologicals',
    modelName: 'Psychological',
    timestamps: false,
  });
  return Psychological;
};