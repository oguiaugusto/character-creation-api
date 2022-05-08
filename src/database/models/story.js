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
    id: { type: DataTypes.STRING(8), primaryKey: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'Stories',
    modelName: 'Story',
    timestamps: false,
  });
  return Story;
};
