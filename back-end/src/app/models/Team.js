module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return Team;
};
