const { Avaliacao, AvaliacaoAtleta, AvaliacaoTempo } = require('../models');

class AthleteTestController {
  async findOne(req, res) {
    const content = await this.findById(req.params.id);

    return res.status(200).send({ content });
  }

  async findById(id) {
    const avaliacaoAtleta = await AthleteTestController._findAvaliacaoAtleta(id);
    await AthleteTestController._findAvaliacaoTempo(avaliacaoAtleta);
    const avaliacoes = await AthleteTestController._findAvaliacoes(avaliacaoAtleta);

    return avaliacoes;
  }

  static async _findAvaliacaoAtleta(id) {
    const avaliacaoAtleta = await AvaliacaoAtleta.findAll(
      AthleteTestController._getParams('athleteId', id)
    );

    return avaliacaoAtleta || [];
  }

  static async _findAvaliacaoTempo(avaliacaoAtleta) {
    if (!avaliacaoAtleta || !avaliacaoAtleta.length) return [];

    const avaliacaoTempo = await AvaliacaoTempo.findAll(
      AthleteTestController._getParams('avaliacaoAtletaId', avaliacaoAtleta.map(({ id }) => id))
    );

    avaliacaoTempo.forEach(item => {
      const data = avaliacaoAtleta.find(({ id }) => id === item.avaliacaoAtletaId);

      if (data) {
        data.results = data.results || [];
        data.results.push(item);
      }
    });

    return avaliacaoAtleta;
  }

  static async _findAvaliacoes(avaliacaoAtleta) {
    if (!avaliacaoAtleta || !avaliacaoAtleta.length) return [];

    const avaliacoes = await Avaliacao.findAll(
      AthleteTestController._getParams('id', avaliacaoAtleta.map(({ avaliacaoId }) => avaliacaoId))
    );

    if (!avaliacoes || !avaliacoes.length) {
      return [];
    }

    avaliacaoAtleta.forEach(item => {
      const data = avaliacoes.find(({ id }) => id === item.avaliacaoId);

      if (data) {
        data.inscricoes = data.inscricoes || [];
        data.inscricoes.push(item);
      }
    });

    return avaliacoes;
  }

  static _getParams(name, value) {
    return {
      where: {
        [name]: value
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true
    };
  }
}

module.exports = new AthleteTestController();
