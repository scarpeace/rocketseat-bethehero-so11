// Arquivo que cria a coneção com banco de dados utilizando o KNEX (que benção que é essa parada)
const knex = require('knex');
// Import do nosso arquivo de configuração. Tá tudo documentado lá.
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV == 'test' ? configuration.test: configuration.developement

// Setando o ambiente de desenvolvimento como configuração do KNEX.
const connection = knex(config);

module.exports = connection