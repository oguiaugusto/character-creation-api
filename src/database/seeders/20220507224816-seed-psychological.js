'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Psychologicals', [
      {
        characterId: 'CHA10001',
        intelligence: 'intelligence',
        temperament: 'temperament',
        selfKnowledge: 'selfKnowledge',
        habits: 'habits',
        unconsciousAspects: 'unconsciousAspects',
      },
      {
        characterId: 'CHA10002',
        intelligence: 'intelligence',
        temperament: 'temperament',
        selfKnowledge: 'selfKnowledge',
        habits: 'habits',
        unconsciousAspects: 'unconsciousAspects',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Psychologicals', null, {});
  }
};
