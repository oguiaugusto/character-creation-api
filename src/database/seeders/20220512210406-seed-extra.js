'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Extra', [
      {
        characterId: 'CHA10001',
        info: 'Character 1 extra information',
      },
      {
        characterId: 'CHA10002',
        info: 'Character 2 extra information',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Extra', null, {});
  }
};
