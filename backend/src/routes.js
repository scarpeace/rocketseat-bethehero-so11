const express = require('express')
// Implementacao de Valicadao
const { celebrate, Segments, Joi} = require('celebrate')
// Importação de controlers. Tudo o que eles fazem tá documentado em cada um deles. Eu espero.
const OngController = require('./controlers/OngControler')
const IncidentsControler = require('./controlers/IncidentsControler')
const ProfileControler = require('./controlers/ProfileControler')
const SessionControler = require('./controlers/SessionControler')

// Inicializando a instância de Router em uma variável pra gente poder acessar todas as funções e métodos.
const routes = express.Router();

// Configuração das rotas REST
// É bom prestar atenação no segundo argumento de cada um desses elementos pra ver quais as funções que eles tão chamando com a rota.
routes.post('/sessions', SessionControler.index)

routes.get('/ongs', OngController.index)

//Segments.BODY é basicamente uma variável no celebrate que retorna uma string 'body'. Falando que você vai validar os Headers da sua requisição
// Pra ela, você tem que passar o Joi que faz a validação, falar que ele tá recebendo um Object com o .object()
// Após isso você tem acesso as keys da requisição. Lembrando que isso tá vindo no corpo
// Aí você descreve cada uma das informações que vem no corpo e coloca a validação necessária
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string(),
        uf:Joi.string().required().length(2)
    }).options({ allowUnknown: true })
}),OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}),ProfileControler.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,IncidentsControler.index)

// Implementar a vaidação do Header e do Corpo
// Depois implementar a validação de todas as outras rotas
routes.post('/incidents', IncidentsControler.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentsControler.delete)

// Exportando a porra toda que vai ser importada lá no index.js
module.exports = routes