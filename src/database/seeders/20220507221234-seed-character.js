'use strict';

module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Characters', [
      {
        id: 'CHA10001',
        storyId: 'STO10001',
        name: 'João da Silva',
        birthdate: '12/06/1929',
        father: 'Marcos da Silva',
        mother: 'Fernanda da Silva',
      },
      {
        id: 'CHA10002',
        storyId: 'STO10001',
        name: 'Marcos da Silva',
        birthdate: '30/04/1902',
        father: 'Desconhecido',
        mother: 'Manuela da Silva',
      },
    ], {});
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Characters', null, {});
  }
};
