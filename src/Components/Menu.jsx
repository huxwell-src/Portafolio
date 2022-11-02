import React from 'react'

const Menu = () => {
  return (
    <ul className='flex'>
        <li><a href="#" className='mx-4 text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue'>Inicio</a></li>
        <li><a href="#" className='mx-4 text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue'>Skills</a></li>
        <li><a href="#" className='mx-4 text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue'>Proyectos</a></li>
        <li><a href="#" className='mx-4 text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue'>Contacto</a></li>
    </ul>
  )
}

export default Menu