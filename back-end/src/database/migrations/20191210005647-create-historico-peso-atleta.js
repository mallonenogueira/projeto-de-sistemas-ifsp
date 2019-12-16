'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('historico_peso_atleta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      obs: {
        type: Sequelize.STRING
      },
      athlete_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'athletes',
          key: 'id'
          // onUpdate: 'cascade', onDelete: 'cascade'
        }
      },
      kilo: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('historico_peso_atleta');
  }
};
