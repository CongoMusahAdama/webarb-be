'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Barbers', 'availability', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'yes',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Barbers', 'availability', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  }
};
