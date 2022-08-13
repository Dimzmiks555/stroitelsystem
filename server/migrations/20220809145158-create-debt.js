module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
          'notes',
          'deletedAt',
          {
              allowNull: true,
              type: Sequelize.DATE
          })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('notes', 'deletedAt')
  }
};