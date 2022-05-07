'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Personalities', [
      {
        characterId: 'CHA10001',
        wants: 'wants',
        hopes: 'hopes',
        fears: 'fears',
        memories: 'memories',
        resentments: 'resentments',
        dreams: 'dreams',
        denials: 'denials',
      },
      {
        characterId: 'CHA10002',
        wants: 'wants',
        hopes: 'hopes',
        fears: 'fears',
        memories: 'memories',
        resentments: 'resentments',
        dreams: 'dreams',
        denials: 'denials',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Personalities', null, {});
  }
};
