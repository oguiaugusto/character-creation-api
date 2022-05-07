'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    static associate(models) {
      this.hasMany(models.Character, { foreignKey: 'storyId', as: 'characters' });
    }
  }
  Story.init({
    id: DataTypes.STRING(8),
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    tableName: 'Stories',
    modelName: 'Story',
    timestamps: false,
  });
  return Story;
};
