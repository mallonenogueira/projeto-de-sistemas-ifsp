'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('avaliacao_atleta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      athlete_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'athletes',
          key: 'id'
          // onUpdate: 'cascade', onDelete: 'cascade'
        }
      },
      avaliacao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'avaliacoes',
          key: 'id'
          // onUpdate: 'cascade', onDelete: 'cascade'
        }
      },
      order: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('avaliacao_atleta');
  }
};
