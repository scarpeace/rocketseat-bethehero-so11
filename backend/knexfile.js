// Update with your config settings.

//Esse é o arquivo de configuração do KNEX que é responsável pela criação de querys SQL para vários tipos de banco de dados. (GLÓRIA DEUS)

module.exports = {

  // A configuração que eu usei aqui foi do SQLITE3 (está dentro do package.json)
  // essa sãos as configurações do banco de dados no ambiente de desenvolvimento.
  development: {
    client: 'sqlite3',
    connection: {
      //Arquivo que vai ser gerado após fazer as migrations
      filename: './src/database/db.sqlite'
    },
    migrations:{
      //Diretório aonde vão ficar as migrations
      directory:'./src/database/migrations'
    },
    //Eu esqueci o que isso faz, mas se eu for chutar: não sei.
    useNullAsDefault: true,
  },
 
  //Aqui são as configurações para desenvolvimento, mas voltadas para o processo de testes
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  //Aqui o pau tá torando
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
