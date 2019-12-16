const { Athlete, Team } = require('../models');
const AthleteTestController = require('./AthleteTestController');
const AthletePesoController = require('./AthletePesoController');

class AthleteController {
  async create(req, res, next) {
    const { kilo, name, nickname, email, birth, children, phone, team } = req.body;

    const response = await Athlete.create({
      name,
      nickname,
      email,
      birth,
      children,
      phone,
      kilo,
      team
    });

    const { dataValues: athlete } = response;

    await AthletePesoController.push({
      id: athlete.id,
      kilo,
      obs: 'Cadastro'
    });

    return res.json({
      id: athlete.id
    });
  }

  async update(req, res) {
    const { name, nickname, email, birth, children, phone, team, kilo } = req.body;
    const { id } = req.params;

    const response = await Athlete.update(
      {
        name,
        nickname,
        email,
        birth,
        children,
        phone,
        kilo,
        team
      },
      {
        where: { id }
      }
    );

    if (!response || !response.length || !response[0]) {
      return res.status(404).send({ message: 'Data not found' });
    }

    await AthletePesoController.push({
      id: id,
      kilo,
      obs: 'Cadastro'
    });

    return res.status(204).send();
  }

  async findAll(req, res) {
    const athletes = await Athlete.findAll({
      order: ['name'],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'kilo']
      }
    });

    return res.status(200).send({ content: athletes });
  }

  async findOne(req, res) {
    const { id } = req.params;
    const { tests, peso } = req.query;

    const athlete = await Athlete.findByPk(id, {
      include: [
        {
          model: Team
        }
      ],
      raw: true
    });

    if (tests && athlete) {
      athlete.tests = await AthleteTestController.findById(id);
    }

    if (peso && athlete) {
      athlete.kilos = await AthletePesoController.findById(id);
      athlete.kilo = athlete.kilos && athlete.kilos.length ? athlete.kilos[0].kilo : athlete.kilo;
    } else if (athlete) {
      // console.log('id', id);
      const kil = (await AthletePesoController.findLast({ id })) || {};
      athlete.kilo = kil.kilo || athlete.kilo;
    }

    return res.status(200).send({ content: athlete });
  }

  async delete(req, res) {
    const { id } = req.params;

    const destroyedNumbers = await Athlete.destroy({
      where: { id }
    });

    if (!destroyedNumbers) {
      return res.status(404).send({ message: 'Data not found' });
    }

    return res.status(204).send();
  }
}

module.exports = new AthleteController();
