'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Barbers', 'portfolio');
    await queryInterface.addColumn('Barbers', 'portfolio', {
      type: Sequelize.JSON, // Define as JSON
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Barbers', 'portfolio');
  }
};
