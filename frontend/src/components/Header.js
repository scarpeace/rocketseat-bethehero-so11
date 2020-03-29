import React from 'react'

// O componente Header basicamente só renderiza os elementos filhos que vem como props
const Header = (props) => {
  return(
    <header>
      {props.children}
    </header>
  )
}

export default Header