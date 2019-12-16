const { Team } = require('../models');
const { Op } = require('sequelize');

class TeamController {
  async create(req, res) {
    const { name, description } = req.body;

    const { dataValues: team } = await Team.create({
      name,
      description
    });

    return res.json({
      id: team.id
    });
  }

  async update(req, res) {
    const { name, description } = req.body;
    const { id } = req.params;

    const updatedTeam = await Team.update(
      {
        name,
        description
      },
      {
        where: { id }
      }
    );

    if (!updatedTeam || !updatedTeam.length || !updatedTeam[0]) {
      return res.status(404).send({ message: 'Team not found' });
    }

    return res.status(204).send();
  }

  async findAll(req, res) {
    const { q } = req.query;
    const where = {};

    if (q) {
      where.name = {
        [Op.like]: `${q}%`
      };
    }

    const teams = await Team.findAll({
      order: ['name'],
      where
    });

    return res.status(200).send({ content: teams });
  }

  async delete(req, res) {
    const { id } = req.params;

    const destroyedNumbers = await Team.destroy({
      where: { id }
    });

    if (!destroyedNumbers) {
      return res.status(404).send({ message: 'Team not found' });
    }

    return res.status(204).send();
  }
}

module.exports = new TeamController();
