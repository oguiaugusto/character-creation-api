'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Physicals', [
      {
        characterId: 'CHA10001',
        age: 'age',
        weight: 'weight',
        height: 'height',
        health: 'health',
        ethnicity: 'ethnicity',
        hair: 'hair',
        nationality: 'nationality',
        gender: 'gender',
        sexuality: 'sexuality',
        highlights: 'highlights',
      },
      {
        characterId: 'CHA10002',
        age: 'age',
        weight: 'weight',
        height: 'height',
        health: 'health',
        ethnicity: 'ethnicity',
        hair: 'hair',
        nationality: 'nationality',
        gender: 'gender',
        sexuality: 'sexuality',
        highlights: 'highlights',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Physicals', null, {});
  }
};
