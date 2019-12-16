'use strict';
module.exports = (sequelize, DataTypes) => {
  const HistoricoPesoAtleta = sequelize.define(
    'HistoricoPesoAtleta',
    {
      obs: DataTypes.STRING,
      kilo: DataTypes.DOUBLE,
      athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Athlete',
          key: 'id'
        }
      }
    },
    {}
  );

  HistoricoPesoAtleta.associate = models => {
    HistoricoPesoAtleta.belongsTo(models.Athlete, {
      foreignKey: {
        name: 'athlete',
        field: 'athlete_id'
      }
    });
  };

  return HistoricoPesoAtleta;
};
