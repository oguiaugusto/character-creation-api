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
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Characters');
  }
};