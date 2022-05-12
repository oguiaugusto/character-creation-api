'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) {
      this.belongsTo(models.Story, { foreignKey: 'storyId', as: 'story' });
      this.hasOne(models.KeyPoints, { foreignKey: 'characterId', as: 'keyPoints', onDelete: 'cascade', hooks: true });
    }
  }
  Character.init({
    id: { type: DataTypes.STRING(8), primaryKey: true },
    storyId: DataTypes.STRING(8),
    name: DataTypes.STRING,
    birthdate: DataTypes.STRING,
    father: DataTypes.STRING,
    mother: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'Characters',
    modelName: 'Character',
    timestamps: false,
  });
  return Character;
};