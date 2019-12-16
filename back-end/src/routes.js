const routes = require('express').Router();

// const authMiddleware = require('./app/middleware/auth');

const SessionController = require('./app/controllers/SessionController');
const TeamController = require('./app/controllers/TeamController');
const TeamValidator = require('./app/validators/TeamValidator');
const AthleteController = require('./app/controllers/AthleteController');
const AgilidadeController = require('./app/controllers/AgilidadeController');
const YoyoController = require('./app/controllers/YoyoController');
const RastController = require('./app/controllers/RastController');
const AthleteTestController = require('./app/controllers/AthleteTestController');
const AthletePesoController = require('./app/controllers/AthletePesoController');

const handleError = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

routes.post('/sessions', SessionController.store);

routes.delete('/teams/:id', handleError(TeamController.delete));
routes.get('/teams', handleError(TeamController.findAll));
routes.post('/teams', TeamValidator.create, handleError(TeamController.create));
routes.put('/teams/:id', handleError(TeamController.update));

routes.delete('/athletes/:id', handleError(AthleteController.delete));
routes.get('/athletes', handleError(AthleteController.findAll));
routes.get('/athletes/:id', handleError(AthleteController.findOne));
routes.post('/athletes', handleError(AthleteController.create));
routes.put('/athletes/:id', handleError(AthleteController.update));

routes.get(
  '/athletes/:id/tests',
  handleError(AthleteTestController.findOne.bind(AthleteTestController))
);

routes.get(
  '/athletes/:id/peso',
  handleError(AthletePesoController.findOne.bind(AthletePesoController))
);

routes.post('/agilidade', handleError(AgilidadeController.create));
routes.put('/agilidade/:id', handleError(AgilidadeController.update));
routes.get('/agilidade', handleError(AgilidadeController.findAll));
routes.get('/agilidade/:id', handleError(AgilidadeController.findOne));
routes.delete('/agilidade/:id', handleError(AgilidadeController.delete));

routes.post('/yoyo', handleError(YoyoController.create));
routes.put('/yoyo/:id', handleError(YoyoController.update));
routes.get('/yoyo', handleError(YoyoController.findAll));
routes.get('/yoyo/:id', handleError(YoyoController.findOne));
routes.delete('/yoyo/:id', handleError(YoyoController.delete));

routes.post('/rast', handleError(RastController.create));
routes.put('/rast/:id', handleError(RastController.update));
routes.get('/rast', handleError(RastController.findAll));
routes.get('/rast/:id', handleError(RastController.findOne));
routes.delete('/rast/:id', handleError(RastController.delete));

routes.use((err, req, res, next) => {
  console.log(err);

  res.status(500).send({ error: 'Internal Error' });
});

// routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
