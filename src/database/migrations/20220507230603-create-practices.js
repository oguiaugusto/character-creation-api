'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Practices', {
      characterId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Characters',
          key: 'id',
        },
      },
      wears: {
        type: Sequelize.STRING,
      },
      eats: {
        type: Sequelize.STRING,
      },
      buys: {
        type: Sequelize.STRING,
      },
      worksAt: {
        type: Sequelize.STRING,
      },
      playsAt: {
        type: Sequelize.STRING,
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Practices');
  }
};