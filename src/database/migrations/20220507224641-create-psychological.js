'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Psychologicals', {
      characterId: {
        type: Sequelize.STRING(8),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Characters',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      intelligence: {
        type: Sequelize.STRING,
      },
      temperament: {
        type: Sequelize.STRING,
      },
      selfKnowledge: {
        type: Sequelize.STRING,
      },
      habits: {
        type: Sequelize.STRING,
      },
      unconsciousAspects: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Psychologicals');
  }
};