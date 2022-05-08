'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stories', {
      id: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Stories');
  }
};