module.exports = (sequelize, DataTypes) => {
  const Athlete = sequelize.define('Athlete', {
    birth: DataTypes.DATEONLY,
    children: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    kilo: DataTypes.DOUBLE,
    name: DataTypes.STRING,
    nickname: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  Athlete.associate = models => {
    // associations can be defined here
    Athlete.belongsTo(models.Team, {
      foreignKey: {
        name: 'team',
        field: 'team_id'
      }
    });

    Athlete.belongsToMany(models.Avaliacao, {
      through: models.AvaliacaoAtleta,
      as: 'athletes'
    });
  };

  return Athlete;
};
