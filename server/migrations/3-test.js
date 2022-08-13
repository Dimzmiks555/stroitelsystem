'use strict';

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished

      migration.addColumn(
          'notes',
          'deletedAt',
          {
              type: DataTypes.DATE,
              allowNull: true,
              validate: {
              }
          }
      );
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    // migration.removeColumn('notes', 'deletedAt');
    // done();
  }
};