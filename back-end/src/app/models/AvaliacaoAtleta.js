'use strict';

module.exports = (sequelize, DataTypes) => {
  const AvaliacaoAtleta = sequelize.define(
    'AvaliacaoAtleta',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Athlete',
          key: 'id'
        }
      },
      avaliacaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Avaliacao',
          key: 'id'
        }
      },
      order: DataTypes.INTEGER
    },
    {
      timestamps: false
    }
  );

  AvaliacaoAtleta.associate = models => {
    AvaliacaoAtleta.belongsTo(models.Athlete, {
      foreignKey: {
        name: 'athlete',
        field: 'athlete_id'
      }
    });
  };

  return AvaliacaoAtleta;
};
