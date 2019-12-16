const request = require('supertest');

const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');

const { Team } = require('../../src/app/models');

describe('team registration', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should create a new team', async () => {
    expect.hasAssertions();

    const { dataValues: team } = await factory.build('Team');

    const response = await request(app)
      .post('/teams')
      .send(team);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not create a new team', async () => {
    expect.hasAssertions();

    const team = { name: null };

    let response = await request(app)
      .post('/teams')
      .send(team);

    expect(response.status).toBe(400);

    team.name = '';

    response = await request(app)
      .post('/teams')
      .send(team);

    expect(response.status).toBe(400);
  });

  it('should find all teams', async () => {
    expect.hasAssertions();

    const factoryResponse = await factory.createMany('Team', 5);
    const teams = factoryResponse.map(({ dataValues: team }) => team);

    const response = await request(app).get('/teams');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.content).toHaveLength(5);

    const formattedResponse = response.body.content.map(team => ({
      ...team,
      updatedAt: new Date(team.updatedAt),
      createdAt: new Date(team.createdAt)
    }));

    teams.forEach((team, index) => {
      expect(formattedResponse[index]).toMatchObject(teams[index]);
    });
  });

  it('should not find teams', async () => {
    expect.hasAssertions();

    const response = await request(app).get('/teams');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content');
    expect(response.body.content).toHaveLength(0);
  });

  it('should update team', async () => {
    expect.hasAssertions();
    const { dataValues: createdTeam } = await factory.create('Team');
    const newTeam = {
      name: 'ZZzZzZZzMallone',
      description: null
    };

    const response = await request(app).put(`/teams/${createdTeam.id}`, newTeam);

    expect(response.status).toBe(204);

    const { dataValues: updatedTeam } = await Team.findByPk(createdTeam.id);

    console.log(updatedTeam);
    console.log(createdTeam);
    console.log(newTeam);
  });
});
