'use strict';
module.exports = (sequelize, DataTypes) => {
  const AvaliacaoTempo = sequelize.define(
    'AvaliacaoTempo',
    {
      time: DataTypes.DOUBLE,
      avaliacaoAtletaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'AvaliacaoAtleta',
          key: 'id'
        }
      }
    },
    {
      timestamps: false
    }
  );

  AvaliacaoTempo.associate = models => {
    AvaliacaoTempo.belongsTo(models.AvaliacaoAtleta, {
      foreignKey: {
        name: 'avaliacaoAtleta',
        field: 'avaliacao_atleta_id'
      }
    });
  };

  return AvaliacaoTempo;
};
