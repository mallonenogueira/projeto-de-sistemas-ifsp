const { body } = require('express-validator');
const validate = require('../middleware/validate');

class TeamValidator {
  async create() {
    return validate([
      body('name')
        .trim()
        .not()
        .isEmpty()
    ])(...arguments);
  }
}

module.exports = new TeamValidator();
