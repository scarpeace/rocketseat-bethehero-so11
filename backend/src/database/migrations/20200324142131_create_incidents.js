// Falei muito como eu me sinto em relações a Migrations no arquivo das ONGS então esse aqui eu vou mais espeficicar o que faz.

exports.up = function(knex) {
  //Cria um schema com a tabela. Recebe primeiro um nome e em seguida uma função com um parâmetro "table"
  return knex.schema.createTable("incidents", function(table){
    // Aqui vai ser setado automaticamente como ID e auto incremental. Não sei como o knex faz isso mas é uma boa.
    table.increments();
    // Setando um novo campo no DB com o nome "título" que não pode ser nulo.
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();
    
    //Setando um novo campo 'ONG ID" o qual vai vir de outra tabela dentro do mesmo banco de dados.
    table.string("ong_id").notNullable();

    // Isso aqui é de dar graças a deus. O knex faz uma referência à outra tabela de ongs e seta a propriedade dentro do "incident" linkando a uma ong. 
    // Então todo incidente vai ter a referência de qual ong é responsável ou criout ele.
    // Isso vai ser informado pelo front com a autenticação na hora de enviar os dados. Não precisa se preocupar daonde vai vir isso.
    table.foreign("ong_id").references("id").inTable("ongs")
  })
};

// Aqui é se a cobra fumar.
// Mais uma vez, MUITO CUIDADO TODA VEZ QUE VOCÊ FOR DIGITAR 'D-R-O-P T-A-B-L-E". tenha certeza do que você tá fazendo.
exports.down = function(knex) {
  return knex.schema.dropTable("incidents")
};
