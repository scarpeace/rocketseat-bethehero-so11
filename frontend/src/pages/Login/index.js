// Importação padrão do React e do useState para aplicar estado a esse componente (Hooks)
import React, { useState } from 'react'
// Importação do Link prara navegação entre rotas e o useHistory para encaminhar o usuário para outra rota aṕós a execução do método
import { Link, useHistory } from 'react-router-dom'
// Importação do Feather Icons pelo react-icons (Isso é muito massa)
import { FiLogIn } from 'react-icons/fi'

// Connecta com a API(Que tem basicamente a Base URL)
import api from '../../services/api'

// Importação de estilo e recursos estáticos
import "./styles.css";
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg'

export default function Login() {

  // Hooks
  const [id, setId] = useState('');
  // History
  const history = useHistory();

  // Função executada quando o usuário envia o formulario
  async function handleLogin(e) {
    e.preventDefault();

    try {
      // Fazendo o post passando o ID que muda toda vez que é alterado por conta do setID lá dentro do formulario.
      const response = await api.post('sessions', { id });

      // Seta a uma valor na memória do navegador, isso fica disponível pra toda aplicação
      // O ideal aqui é usar redux mas acho que o Diego queria facilitar um pouco o nosso processo.
    
      // Observe que no para setar um item no local storage você passa o nome da chave que você quer usar
     // e depois passa o dado, isso vai ser convertido num objet com key:value pair.
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name)
      // History.push salvando vidas
        history.push('/profile')
    } catch (err) {
      console.log(err)
      alert('Falha no Login, tente novamente')
    }
  }

  // Formulário de Login em si, não comentar isso porque é basicamente JSX e imports. 
  // Porém eu to indo dar uma documentada no CSS pra tentar memorizar mais um pouco
  return (
    <div>
      <div className="logon-container">
        <section className="form">
          <img src={logo} alt="Be the Hero" />

          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>

            <input placeholder="Sua ID" onChange={e => { setId(e.target.value) }} />
            <button className="button" type="submit">Login</button>

            <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#E02041" />
                Não tenho cadastro
            </Link>

          </form>
        </section>

        <img src={heroesImg} alt="Heroes" />
      </div>
    </div>
  )
}
