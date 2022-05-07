'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Personals', [
      {
        characterId: 'CHA10001',
        family: 'family',
        friends: 'friends',
        colleagues: 'colleagues',
        pets: 'pets',
        birthplace: 'birthplace',
        childhood: 'childhood',
        education: 'education',
        hobbies: 'hobbies',
        beliefs: 'beliefs',
        values: 'values',
        lifestyle: 'lifestyle',
        maritalStatus: 'maritalStatus',
        religion: 'religion',
        profession: 'profession',
        possessions: 'possessions',
      },
      {
        characterId: 'CHA10002',
        family: 'family',
        friends: 'friends',
        colleagues: 'colleagues',
        pets: 'pets',
        birthplace: 'birthplace',
        childhood: 'childhood',
        education: 'education',
        hobbies: 'hobbies',
        beliefs: 'beliefs',
        values: 'values',
        lifestyle: 'lifestyle',
        maritalStatus: 'maritalStatus',
        religion: 'religion',
        profession: 'profession',
        possessions: 'possessions',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Personals', null, {});
  }
};
