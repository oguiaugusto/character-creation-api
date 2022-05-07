'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      this.belongsTo(models.Story, { foreignKey: 'storyId', as: 'story' });
      this.hasOne(models.Character, { foreignKey: 'characterId', as: 'keyPoints' });
      this.hasOne(models.Character, { foreignKey: 'characterId', as: 'physical' });
      this.hasOne(models.Character, { foreignKey: 'characterId', as: 'psychological' });
      this.hasOne(models.Character, { foreignKey: 'characterId', as: 'personal' });
      this.hasOne(models.Character, { foreignKey: 'characterId', as: 'personality' });
      this.hasOne(models.Character, { foreignKey: 'characterId', as: 'practices' });
    }
  }
  Character.init({
    id: DataTypes.STRING(8),
    storyId: DataTypes.UUID,
    name: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    father: DataTypes.STRING,
    mother: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    tableName: 'Characters',
    modelName: 'Character',
    timestamps: false,
  });
  return Character;
};