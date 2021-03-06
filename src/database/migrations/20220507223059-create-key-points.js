'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('KeyPoints', {
      characterId: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Characters',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      goal: {
        type: Sequelize.STRING,
      },
      motivation: {
        type: Sequelize.STRING,
      },
      purpose: {
        type: Sequelize.STRING,
      },
      fears: {
        type: Sequelize.STRING,
      },
      virtues: {
        type: Sequelize.STRING,
      },
      flaws: {
        type: Sequelize.STRING,
      },
      peculiarities: {
        type: Sequelize.STRING,
      },
      love: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('KeyPoints');
  },
};
