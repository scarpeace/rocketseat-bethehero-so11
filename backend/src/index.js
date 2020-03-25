const express = require('express');
const routes = require('./routes');
const cors = require('cors')

// Inicializando a instância do express pra lidar com as rotas de requests ao banco de dados.
const app = express();

// Cors é uma ferramenta de segurança que fala que a aplicação somente deve ser acessada por tal endereço. Isso serve mais quando a gente for fazer o deploy da aplicação.
app.use(cors());
// Essa linha é ESSENCIAL!! Fala que o express vai usar o formato JSON. Aonde especificamente eu não sei, eu só sei que isso tem que ficar aqui.
app.use(express.json())
// Arquivo externo de configuração de rotas do backend. Toda a documentação tá lá.
app.use(routes)


// Aqui eu defino a porta que meu aplicativo vai ficar rodando.
app.listen(3334)