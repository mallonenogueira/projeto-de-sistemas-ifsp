const { Avaliacao, AvaliacaoAtleta, AvaliacaoTempo, Athlete } = require('../models');
const AthletePesoController = require('./AthletePesoController');
const { Op } = require('sequelize');

class AvaliacaoController {
  async create(type, { name, date, athletes }) {
    const avaliacao = await Avaliacao.create({
      name,
      date,
      type
    });

    if (athletes && athletes.length) {
      const resultsId = await AvaliacaoAtleta.bulkCreate(
        athletes.map(({ id }, index) => ({
          avaliacaoId: avaliacao.dataValues.id,
          athleteId: id,
          order: index + 1
        }))
      );
      const mapResults = [];

      athletes.forEach(({ results }, index) => {
        if (!results) {
          return;
        }

        mapResults.push(
          ...results.map(result => ({
            avaliacaoAtletaId: resultsId[index].dataValues.id,
            time: result.time
          }))
        );
      });

      await AvaliacaoTempo.bulkCreate(mapResults);
      const promises = [];

      athletes.forEach(({ id, kilo }) => {
        if (kilo) {
          promises.push(
            AthletePesoController.push({
              id: id,
              kilo,
              obs: type + '(' + avaliacao.id + ')'
            })
          );
        }
      });

      await Promise.all(promises);
    }

    return {
      id: avaliacao.dataValues.id
    };
  }

  async update(type, { name, date, athletes, id }) {
    const avaliacao = await Avaliacao.findByPk(id);

    const avaliacaoAtleta = await AvaliacaoAtleta.findAll({
      where: {
        avaliacaoId: avaliacao.id
      },

      raw: true
    });

    const formattedAthletes = athletes.map((athlete, index) => ({
      id: athlete.inscricaoId,
      avaliacaoId: avaliacao.dataValues.id,
      athleteId: athlete.id,
      kilo: athlete.kilo,
      order: index + 1,
      results: athlete.results || []
    }));

    const formattedAthletesId = formattedAthletes.map(({ id }) => id).filter(Boolean);
    const mapIds = avaliacaoAtleta.map(({ id }) => id);
    const deleteInscricaoIds = mapIds.filter(value => formattedAthletesId.indexOf(value) === -1);

    const promises = [];
    const creates = [];

    promises.push(
      AvaliacaoTempo.destroy({
        where: {
          avaliacaoAtletaId: mapIds
        }
      })
    );

    promises.push(
      AvaliacaoAtleta.destroy({
        where: {
          id: deleteInscricaoIds
        }
      })
    );

    formattedAthletes.forEach(item => {
      if (item.id) {
        promises.push(
          AvaliacaoAtleta.update(item, {
            where: { id: item.id }
          })
        );

        const mapResults = [];

        mapResults.push(
          ...item.results.map(result => ({
            avaliacaoAtletaId: item.id,
            time: result.time
          }))
        );

        promises.push(AvaliacaoTempo.bulkCreate(mapResults));
      } else {
        creates.push(item);
      }

      if (item.kilo) {
        promises.push(
          AthletePesoController.push({
            id: item.athleteId,
            kilo: item.kilo,
            obs: type + '(' + avaliacao.id + ')'
          })
        );
      }
    });

    promises.push(this.novosAthletes(creates));

    avaliacao.name = name;
    avaliacao.date = date;
    avaliacao.type = type;

    promises.push(avaliacao.save());

    await Promise.all(promises);

    return { content: null };
  }

  async novosAthletes(athletes) {
    if (athletes && athletes.length) {
      const resultsId = await AvaliacaoAtleta.bulkCreate(athletes);
      const mapResults = [];

      athletes.forEach(({ results }, index) => {
        if (!results) {
          return;
        }

        mapResults.push(
          ...results.map(result => ({
            avaliacaoAtletaId: resultsId[index].dataValues.id,
            time: result.time
          }))
        );
      });

      await AvaliacaoTempo.bulkCreate(mapResults);
    }
  }

  async findAll(type, { q }) {
    const where = {
      type
    };

    if (q) {
      where.name = {
        [Op.like]: `${q}%`
      };
    }

    const avaliacoes = await Avaliacao.findAll({
      order: ['name'],
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });

    return { content: avaliacoes };
  }

  async findOne(type, { id }) {
    const avaliacao = await Avaliacao.findByPk(id, {
      raw: true
    });

    if (!avaliacao || avaliacao.type !== type) {
      return {
        content: null
      };
    }

    const athletes = await AvaliacaoAtleta.findAll({
      where: {
        avaliacaoId: avaliacao.id
      },

      order: ['order'],

      include: [
        {
          model: Athlete,
          attributes: ['id', 'name', 'nickname', 'kilo']
        }
      ],
      raw: true
    });

    const times = await AvaliacaoTempo.findAll({
      where: {
        avaliacaoAtletaId: athletes.map(athlete => athlete.id)
      },
      attributes: {
        exclude: ['avaliacaoAtleta']
      },
      raw: true
    });

    const formatResult = (results, id) =>
      results
        .filter(({ avaliacaoAtletaId }) => id === avaliacaoAtletaId)
        .map(({ avaliacaoAtletaId, ...args }) => ({ ...args, inscricaoId: avaliacaoAtletaId }));

    const promises = [];

    athletes.forEach(athlete => {
      promises.push(
        AthletePesoController.findLast({
          id: athlete['Athlete.id']
        })
      );
    });

    let pesos = await Promise.all(promises);
    pesos = pesos.filter(Boolean);

    avaliacao.athletes = athletes.map(athlete => ({
      inscricaoId: athlete.id,
      results: formatResult(times, athlete.id),
      order: athlete.order,
      id: athlete['Athlete.id'],
      name: athlete['Athlete.name'],
      nickname: athlete['Athlete.nickname'],
      // kilo: athlete['Athlete.kilo'],
      kilo:
        (pesos.find(({ athlete: aId }) => aId === athlete.athleteId) || {}).kilo ||
        athlete['Athlete.kilo']
    }));

    return { content: avaliacao };
  }

  async delete(type, { id }) {
    const avaliacaoAthletes = await AvaliacaoAtleta.findAll({
      where: {
        avaliacaoId: id
      },
      raw: true
    });

    await AvaliacaoTempo.destroy({
      where: {
        avaliacaoAtletaId: avaliacaoAthletes.map(({ id }) => id)
      }
    });

    await AvaliacaoAtleta.destroy({
      where: {
        avaliacaoId: id
      }
    });

    await Avaliacao.destroy({
      where: { id, type }
    });
  }
}

module.exports = new AvaliacaoController();
