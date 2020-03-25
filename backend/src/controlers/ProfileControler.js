const connection = require('../database/connection')

module.exports = {
  //Método profile que retorna uma ONG com todos os seus Incidents
  async index(request, response) {
    //O ID vai vir a partir do Header do request. O front end precisa lembrar disso.
    const ong_id = request.headers.authorization

    //Aqui é massa:
    //A connection tá indo dentro da DB INCIDENTS e buscando todos os registros aonde o ONG_ID(que é uma chave externa alocada na criação do registro dependendo da ONG que tiver criando)
    //Todo INCIDENT que for criado vai ter o ID da ONG que criou ele
    // A partir daqui é só pegar o dado que veio no header da requisição e comparar com os registros no bnaco
    const incidents = await connection('incidents').where('ong_id', ong_id).select('*')

    //Por fim, retorna todos. Sempre lembrando de converter para um formato JSON pro Front End
    return response.json(incidents)

  }
}