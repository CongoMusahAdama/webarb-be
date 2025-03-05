'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Barbers', 'portfolio', {
      type: Sequelize.JSON, // Change to JSON to store an array of URLs
      allowNull: true, // Optional
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Barbers', 'portfolio', {
      type: Sequelize.STRING, // Revert back to STRING if needed
      allowNull: true,
    });
  }
};
