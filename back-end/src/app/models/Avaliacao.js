'use strict';

module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define(
    'Avaliacao',
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      date: DataTypes.DATEONLY
    },
    {
      tableName: 'avaliacoes'
    }
  );

  Avaliacao.associate = models => {
    Avaliacao.belongsToMany(models.Athlete, {
      through: models.AvaliacaoAtleta,
      as: 'athletes',
      foreignKey: 'athleteId',
      otherKey: 'avaliacaoId'
    });
  };

  return Avaliacao;
};
