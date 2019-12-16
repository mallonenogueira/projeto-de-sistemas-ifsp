'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('avaliacao_tempos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time: {
        type: Sequelize.DOUBLE
      },
      avaliacao_atleta_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'avaliacao_atleta',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      }
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('avaliacao_tempos');
  }
};
