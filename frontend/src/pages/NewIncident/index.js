import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import "./styles.css"
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {

// Hooks
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [value, setValue] = useState('')

const ongId = localStorage.getItem('ongId')
const history = useHistory()

  async function handleSubmit(e){
    e.preventDefault()
    const data = {
      title,
      description,
      value
    }

    // Try Catch pra exibir o errro no console.
    // Aqui a gente tá passando a autorização dentro do Header que é o ID
    // E a data que foi extraída do formulário a partir dos hooks
    try{
      await api.post('incidents', data,{
        headers: {
          Authorization: ongId
        }
      })
      history.push('/profile')
    }catch(e){
      alert('Erro ao cadastrar caso tente novamente!')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

          <Link className="back-link" to="/profile" style={{backgroundColor: '#FFF'}}>
            {/* TODO - Arrumar a cor desse icone aqui que tá destacando no fundo */}
            <FiArrowLeft size={16} color="##E02041" />
                Voltar para Home
          </Link>

        </section>
        <form onSubmit={handleSubmit}>
          <input 
          placeholder="Titulo do caso" 
          onChange = {e=> setTitle(e.target.value)}
          />
          <textarea 
          placeholder="Descrição" 
          onChange = {e=> setDescription(e.target.value)}
          />
          <input 
          placeholder="Valor em Reais" 
          onChange = {e=> setValue(e.target.value)}
          />
          
          <button className="button" type='submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}