'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personality extends Model {
    static associate(models) {
      this.belongsTo(models.Character, { foreignKey: 'characterId', as: 'personality' });
    }
  }
  Personality.init({
    characterId: DataTypes.STRING(8),
    wants: DataTypes.STRING,
    hopes: DataTypes.STRING,
    fears: DataTypes.STRING,
    memories: DataTypes.STRING,
    resentments: DataTypes.STRING,
    dreams: DataTypes.STRING,
    denials: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'Personalities',
    modelName: 'Personality',
    timestamps: false,
  });
  return Personality;
};