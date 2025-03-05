'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Barbers', 'portfolio', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: [], // Default to an empty array
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Barbers', 'portfolio');
  }
};
