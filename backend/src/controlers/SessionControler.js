const connection = require('../database/connection')

module.exports = {
  //Request que retorna a ONG caso achou ela no banco de dados. Isso vai ser usado pra Login.
  async index(request, response) {
    // O id vai vir a partir do body da requisição, dentro do formulário de login.
    const { id } = request.body;

    //Essa função assíncrona busca todas as ongs o qual o ID for igual ao enviado pelo formulário.
    // O first() é pra falar pro connection que ele tem que parar no primeiro resultado der match.
    const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first();

    // Se esse resultado não existir, nós vamos retornar um status com um erro dentro.
    // Após passar o código do status é necessário passar um objeto CONVERTIDO EM JSON com o erro e a mensagem do maldito.
    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' })
    }

    //por fim, retorna a ong que foi encontrada no banco de dados. Se o front quiser mais informações é aqui que tem que vir.
    return response.json(ong)
  }

}