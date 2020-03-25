// Pelo fato de eu ficar maravilhado como esse KNEX funciona, essa foi a parte do video que eu assisti várias vezes.
// Eu queria entender realmente como funciona essa primeira migration e não só usar como snippet. 
// Sim, eu vou ler a documentação mas eu vou dar um resumão do que eu aprendi aqui, isso pode ficar um pouco longo.

// Aqui é se tudo der certo. detalhe que é um export
exports.up = function(knex) {
  // Aqui o Knex cria uma nova tabela dentro do banco de dados, o primeiro argumento é o nome da tabela. A função recebe 'table' e vai ditar como cada campo vai ser.
  return knex.schema.createTable('ongs', function(table) {
    // Primeira String é o ID (Gerada pelo Crypto 4 bits, Hexadecimal),
    // O 'primary' fala que essa vai ser a chave primária do elemento. Que vai ser usada com referencia.
    table.string("id").primary();
    // Aqui temos o nome que foi definido que vai ser uma string que não pode ser nulo.
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    // Aqui definimos o estado como uma string mas limitamos o tamanho dele com um segundo argumento. Também não pode ser nulo.
    table.string("uf", 2).notNullable();
  });
};

// Aqui é se der errado, como é a primeira tabela do sistema eu acho que é de boas mandar o "dropTable" aqui. Mas tem que tomar muito cuidado com esse comando.
exports.down = function(knex) {
  return knex.schema.dropTable("ongs");
};

// Alguns comandos que eu lembro porque o meu projeto deu erro pra caramba e eu tive que fazer essa parte de migrations várias vezes.

// -----------------------
// Lista as migrations existentes e fala se elas tão pendentes ou foram concluídas.
// npx knex migrate:list
// -----------------------
// Executa a migration criando assim o banco de dados, se não tiver tudo redondinho com a sua devida sintaxe isso aqui não vai funcionar!!
// npx knex migrate:latest
// -----------------------
// Volta pra trás se tiver alguma treta. o --all é pra sinalizar que volta tudo. Acho aqui tu tem como nomear qual migration tu quer dar o rollback.
// npx knex migrate:rollback --all
// -----------------------
// Aqui é aonde você cria a Migration, ela vem com um template vazio e vai ser criada aonde você especificar no arquivo de configuração do banco de dados. (knexfile.js)
// npx knex migrate:make create_incidents
// -----------------------
// Abre a lista de todos os comandos disponíveis da CLI do KNEX
// npx knex
