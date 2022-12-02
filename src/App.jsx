import React from 'react'
import {Contact, Skills, About, Inicio, NavBar} from './Components/index'

const App = () => {

  return (
    <div>
      <NavBar/>
      <Inicio/>
      <About/>
      <Skills/>
      <Contact/>
    </div>
  )
}

export default App