'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personals', {
      characterId: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Characters',
          key: 'id',
        },
      },
      family: {
        type: Sequelize.STRING,
      },
      friends: {
        type: Sequelize.STRING,
      },
      colleagues: {
        type: Sequelize.STRING,
      },
      pets: {
        type: Sequelize.STRING,
      },
      birthplace: {
        type: Sequelize.STRING,
      },
      childhood: {
        type: Sequelize.STRING,
      },
      education: {
        type: Sequelize.STRING,
      },
      hobbies: {
        type: Sequelize.STRING,
      },
      beliefs: {
        type: Sequelize.STRING,
      },
      values: {
        type: Sequelize.STRING,
      },
      lifestyle: {
        type: Sequelize.STRING,
      },
      maritalStatus: {
        type: Sequelize.STRING,
      },
      religion: {
        type: Sequelize.STRING,
      },
      profession: {
        type: Sequelize.STRING,
      },
      possessions: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Personals');
  }
};