const express = require('express')
const OngController = require('./controlers/OngControler')
const IncidentsControler = require('./controlers/IncidentsControler')
const ProfileControler = require('./controlers/ProfileControler')
const SessionControler = require('./controlers/SessionControler')

const routes = express.Router();

routes.post('/sessions', SessionControler.index)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileControler.index)

routes.get('/incidents', IncidentsControler.index)
routes.post('/incidents', IncidentsControler.create)
routes.delete('/incidents/:id', IncidentsControler.delete)

module.exports = routes