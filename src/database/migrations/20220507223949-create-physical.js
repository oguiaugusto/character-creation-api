'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Physicals', {
      characterId: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Characters',
          key: 'id',
        },
      },
      age: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.STRING,
      },
      health: {
        type: Sequelize.STRING,
      },
      ethnicity: {
        type: Sequelize.STRING,
      },
      hair: {
        type: Sequelize.STRING,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      sexuality: {
        type: Sequelize.STRING,
      },
      highlights: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Physicals');
  }
};