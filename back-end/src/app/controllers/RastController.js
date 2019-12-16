const avaliacaoController = require('./AvaliacaoController');

const type = 'RAST';

class RastController {
  async create(req, res) {
    const { name, date, athletes } = req.body;

    const response = await avaliacaoController.create(type, { name, date, athletes });

    return res.json(response);
  }

  async update(req, res) {
    const { name, date, athletes } = req.body;
    const { id } = req.params;

    await avaliacaoController.update(type, { id, name, date, athletes });

    return res.status(204).send();
  }

  async findAll(req, res) {
    const { q } = req.query;

    const response = await avaliacaoController.findAll(type, { q });

    return res.status(200).send(response);
  }

  async findOne(req, res) {
    const { id } = req.params;

    const response = await avaliacaoController.findOne(type, { id });

    return res.status(200).send(response || {});
  }

  async delete(req, res) {
    const { id } = req.params;

    await avaliacaoController.delete(type, { id });

    return res.status(204).send();
  }
}

module.exports = new RastController();
