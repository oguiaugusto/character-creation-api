'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Practices', [
      {
        characterId: 'CHA10001',
        wears: 'wears',
        eats: 'eats',
        buys: 'buys',
        worksAt: 'worksAt',
        playsAt: 'playsAt',
      },
      {
        characterId: 'CHA10002',
        wears: 'wears',
        eats: 'eats',
        buys: 'buys',
        worksAt: 'worksAt',
        playsAt: 'playsAt',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Practices', null, {});
  }
};
