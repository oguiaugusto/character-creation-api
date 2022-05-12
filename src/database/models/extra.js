'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Extra extends Model {
    static associate(models) {
      this.belongsTo(models.Character, { foreignKey: 'characterId', as: 'extra' });
    }
  }
  Extra.init({
    characterId: { type: DataTypes.STRING(8), primaryKey: true },
    info: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Extra',
    tableName: 'Extra',
    timestamps: false,
  });
  return Extra;
};