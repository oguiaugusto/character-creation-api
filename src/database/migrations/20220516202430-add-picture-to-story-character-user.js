'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Stories', 'picture', { type: Sequelize.STRING }),
      queryInterface.addColumn('Characters', 'picture', { type: Sequelize.STRING }),
      queryInterface.addColumn('Users', 'picture', { type: Sequelize.STRING }),
    ]);
  },

  down(queryInterface, _Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Stories', 'picture'),
      queryInterface.removeColumn('Characters', 'picture'),
      queryInterface.removeColumn('Users', 'picture'),
    ]);
  },
};
