const { HistoricoPesoAtleta } = require('../models');

class AthletePesoController {
  async findOne(req, res) {
    const historico = await this.findById(req.params.id);

    return res.status(200).send({ content: historico });
  }

  async findById(id) {
    return HistoricoPesoAtleta.findAll({
      order: [['id', 'DESC']],
      where: { athlete_id: id },
      attributes: {
        exclude: ['updatedAt', 'athleteId']
      },
      raw: true
    });
  }

  async findLast({ id }) {
    const historico = await this.findById(id);

    return historico && historico.length ? historico[0] : null;
  }

  async push({ id, kilo, obs }) {
    const old = await this.findLast({ id });

    if (old && +old.kilo === +kilo) {
      return null;
    }

    const response = await HistoricoPesoAtleta.create({
      athleteId: id,
      kilo,
      obs
    });

    return {
      id: response.dataValues.id,
      athleteId: id,
      kilo,
      obs
    };
  }
}

module.exports = new AthletePesoController();
