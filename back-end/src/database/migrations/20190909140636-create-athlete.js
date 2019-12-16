'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('athletes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      birth: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      kilo: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      children: {
        type: Sequelize.BOOLEAN
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
          // onUpdate: 'cascade', onDelete: 'cascade'
        }
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
    return queryInterface.dropTable('athletes');
  }
};
