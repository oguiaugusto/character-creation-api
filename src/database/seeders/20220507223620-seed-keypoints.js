'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('KeyPoints', [
      {
        characterId: 'CHA10001',
        goal: 'goal',
        motivation: 'motivation',
        purpose: 'purpose',
        fears: 'fears',
        virtues: 'virtues',
        flaws: 'flaws',
        peculiarities: 'peculiarities',
        love: 'love',
      },
      {
        characterId: 'CHA10002',
        goal: 'goal',
        motivation: 'motivation',
        purpose: 'purpose',
        fears: 'fears',
        virtues: 'virtues',
        flaws: 'flaws',
        peculiarities: 'peculiarities',
        love: 'love',
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('KeyPoints', null, {});
  },
};
