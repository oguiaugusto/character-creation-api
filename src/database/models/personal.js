'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal extends Model {
    static associate(models) {
      this.belongsTo(models.Character, { foreignKey: 'characterId', as: 'personal' });
    }
  }
  Personal.init({
    characterId: { type: DataTypes.STRING(8), primaryKey: true },
    family: DataTypes.STRING,
    friends: DataTypes.STRING,
    colleagues: DataTypes.STRING,
    pets: DataTypes.STRING,
    birthplace: DataTypes.STRING,
    childhood: DataTypes.STRING,
    education: DataTypes.STRING,
    hobbies: DataTypes.STRING,
    beliefs: DataTypes.STRING,
    values: DataTypes.STRING,
    lifestyle: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    religion: DataTypes.STRING,
    profession: DataTypes.STRING,
    possessions: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'Personals',
    modelName: 'Personal',
    timestamps: false,
  });
  return Personal;
};