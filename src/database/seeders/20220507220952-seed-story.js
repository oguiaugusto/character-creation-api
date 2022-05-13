'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Stories', [
      {
        id: 'STO10001',
        name: 'Uma História qualquer',
        description: 'Descrição não tão longa, mas longa de uma história que pode ser real ou não',
      },
      {
        id: 'STO10002',
        name: 'Outra história qualquer',
        description: 'Descriçãozinha bem curta pra diferenciar',
      },
    ], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Stories', null, {});
  },
};
