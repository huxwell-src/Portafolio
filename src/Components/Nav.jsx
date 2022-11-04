import React from 'react'
//import Menu from './menu'
import Dark from './Dark'
import './css/nav.css'

const Nav = () => {
  return (
    <section className='w-full h-16 flex flex-col items-center fixed z-50 bg-white'>
        <div className='w-10/12 h-16 mt-2'>
            <div className='flex items-center justify-between flex-col md:flex-row '>
                <div className='text-5xl font-bold text-dark-blue font-roboto dark:text-light-gray logo'>
                    NGB
                </div>
                <Menu/>
                <div className='flex items-center'>
                    <Dark/>
                    <span className='text-light-blue font-poppins font-semibold mx-5 dark:text-hyper-light-blue'>English</span>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Nav