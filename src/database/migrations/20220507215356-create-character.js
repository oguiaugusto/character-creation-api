'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
      },
      storyId: {
        type: Sequelize.STRING(8),
        references: {
          model: 'Stories',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      birthdate: {
        type: Sequelize.STRING,
      },
      father: {
        type: Sequelize.STRING,
      },
      mother: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Characters');
  },
};
