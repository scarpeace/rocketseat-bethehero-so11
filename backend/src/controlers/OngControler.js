//Imports
const connection = require('../database/connection');
const crypto = require('crypto')

module.exports = {
  
  //Função que lista todas as ongs
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    //Sempre lembrar de retornar a reposta em JSON
    return response.json(ongs);
  },

  //Função para criar uma nova ONG
  async create(request, response) {
    //Essas informações vem do corpo da requisição que vai ser enviado pelo front end a partir de um form.
    const { name, email, whatsapp, city, uf } = request.body
    // Porém a String é gerada aqui com o crypto. Uma biblioteca para gerar chaves criptografadas.
    // São 4 randomBytes convertidos em uma string Hexadecimal. Então o padrão vai ficar XXXXXXXX com letras e números
    const id = crypto.randomBytes(4).toString('HEX');

    //Método insert do connection recebendo como argumento o objeto a ser inserido no banco de dados.
    await connection('ongs').insert({
      //ID gerada pelo crypto
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    // Na criação de uma ONG estamos retornando somente o ID. Se o front precisar de mais alguma informação é aqui que tem que mudar.
    return response.json({ id })
  }
};