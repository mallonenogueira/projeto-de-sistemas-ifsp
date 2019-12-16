const faker = require('faker');
const { factory } = require('factory-girl');
const { Team } = require('../src/app/models');

factory.define('Team', Team, {
  name: faker.name.findName(),
  description: faker.lorem.sentences()
});

module.exports = factory;
