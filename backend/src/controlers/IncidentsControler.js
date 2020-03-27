const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    //pega qual página veio nos params
    const {page = 1} = request.query

    //Conta o número de incidentes
    const [count] = await connection('incidents')
      .count();

    const incidents = await connection('incidents')
    //O join foi buscar dados em outra tabela. ele basicamente 'dá outro connect'
    .join('ongs','ongs.id','=','incidents.ong_id')
    //Limita o número de resultados
    .limit(5)
    //Offset é a paginação, o segundo número é o número do limite de resultados
    .offset((page - 1) * 5)
    //Retorna um array
    .select(['incidents.*', 'ongs.name','ongs.email','ongs.whatsapp', 'ongs.city', 'ongs.uf']);
    
    //Passa o número de total count pelo header.
    response.header('X-Total-Count', count['count(*)'])
    
    //retorna a resposta em formato JSON, que era o array. Tudo aquilo ali em cima virou um grande objeto.
    return response.json(incidents)
  },

  async create(request, response) {
    //Pega os dados que tão vindo do corpo da requisição
    const { title, description, value } = request.body;
    //Pega o ID da ONG que tá vindo pelo header da requisição
    const ong_id = request.headers.authorization;

    //Connecta com o banco de dados e insere as informações, observe que o ong_id foi concatenado ao objeto.
    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    });

    //Retorna uma resposta com o ID gerado para o incidente. Ele é auto-incremental. Caso o front end precise, podemos retornar mais informações aqui.
    return response.json({ id });
  },

  async delete(request, response) {
    //Pega o ID dos parâmetros do navegador
    const { id } = request.params;
    //Pega o ID da ONG que tá vindo pelo header do request
    const ong_id = request.headers.authorization

    //Faz a conexão com o banco e seleciona o primeiro resultado aonde o ID do Incident for igual ao ID que veio dos parâmetros.
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted' })
    }

    await connection('incidents').where('id', id).delete()

    return response.status(204).send();
  }
}