import React from 'react'
import Nav from './Components/Nav'
import Inicio from './Components/Inicio'
import Skills from './Components/Skills.jsx'
import About from './Components/About'
import NavBar from './Components/Nav'

const App = () => {

  return (
    <div>
      <NavBar/>
      <Inicio/>
      <About/>
      <Skills/>
      
    </div>
  )
}

export default App