import React from 'react'
import buttons from './buttons'
import images from './images'

const Skills = () => {
  return (
    <section id='skills'>
        <div className='w-10/12 h-screen m-auto flex justify-between bg-dark-blue'>
            <div>
                <buttons/>
            </div>
            <div>
                <images/>
            </div>
        </div>
    </section>
  )
}

export default Skills