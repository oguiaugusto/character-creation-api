'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personalities', {
      characterId: {
        type: Sequelize.STRING(8),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Characters',
          key: 'id',
        },
      },
      wants: {
        type: Sequelize.STRING,
      },
      hopes: {
        type: Sequelize.STRING,
      },
      fears: {
        type: Sequelize.STRING,
      },
      memories: {
        type: Sequelize.STRING,
      },
      resentments: {
        type: Sequelize.STRING,
      },
      dreams: {
        type: Sequelize.STRING,
      },
      denials: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Personalities');
  }
};