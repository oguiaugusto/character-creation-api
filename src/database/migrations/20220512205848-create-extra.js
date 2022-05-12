'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Extra', {
      characterId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Characters',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      info: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Extra');
  }
};