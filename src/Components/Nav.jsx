import React from 'react'
import Dark from './Dark'
import BurgerButton from './BurgerButton'
import "./css/nav.css"

const Nav = () => {

    let Links =[
        {name: "Inicio", link:"#inicio"},
        {name: "Skills", link:"#skills"},
        {name: "Proyectos", link:"#proyectos"},
        {name: "Contacto", link:"#contacto"},
    
      ]

  return (
    <nav className='w-full h-20 flex flex-col items-center fixed z-50 bg-white dark:bg-hyper-dark-blue'>
        <div className='w-10/12 h-16 mt-2'>
            <div className='flex items-center justify-between flex-row '>
                <div className='text-5xl font-bold text-dark-blue font-roboto dark:text-light-gray before:content-["</"] after:content-[">"] '>
                    NGB 
                </div>
                    <ul className='md:flex md:items-center'>
                        {
                        Links.map((link)=>( 
                            <li>
                            <a className='mx-4 text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue' 
                            href={link.link}>{link.name}</a>
                            </li>
                        ))
                        }
                    </ul>
                    <div className='flex items-center'>
                        <Dark/>
                        <div className='flex flex-col items-start ml-6'>
                        
                            <button className='text-light-blue font-poppins font-semibold mx-5 dark:text-light-gray flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" className='mx-2 my-1'>
                                    <mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/>
                                    </mask><g mask="url(#a)">
                                    <path fill="#eee" d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"/>
                                    <path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"/>
                                    <path fill="#0052b4" d="M0 0h256v256H0Z"/>
                                    <path fill="#eee" d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"/>
                                    </g>
                                </svg>    
                            English
                            </button>

                            <button className='text-light-blue font-poppins font-semibold mx-5 dark:text-light-gray  flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" className='mx-2 my-1'>
                                    <mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask>
                                    <g mask="url(#a)"><path fill="#d80027" d="m0 256 254.5-51.3L512 256v256H0z"/>
                                    <path fill="#0052b4" d="M0 0h256l52.7 132.8L256 256H0z"/>
                                    <path fill="#eee" d="M256 0h256v256H256zM152.4 89l16.6 51h53.6l-43.4 31.6 16.6 51-43.4-31.5-43.4 31.5 16.6-51L82.2 140h53.6z"/></g>
                                </svg>    
                            Español
                            </button>

                        </div>
                    </div>
                <BurgerButton/>
            </div>
        </div>
    </nav>
  )
}

export default Nav