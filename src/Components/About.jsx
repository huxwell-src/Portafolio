import React from 'react'
import {useTranslation} from "react-i18next"

const About = () => {

  const [t, i18n] = useTranslation("global");

  return (
    <section id='About' >
        <div className='md:w-10/12 w-[100vw] m-auto flex flex-col  sm:flex-row justify-between mx-6 md:mx-0 '>
          <div className='lg:w-[50%] '>
            <h3 className='text-4xl font-bold text-dark-blue dark:text-light-gray ' > {t("about.me")} </h3>
            <h2 className='tittle '> Nicolas Gonzalez Berrios </h2>
            <img src="https://i.ibb.co/sQVxczv/Nico.jpg" alt=""
            className='h-80 w-80 object-cover rounded-full shadow-sm my-6' />
            <div className='flex items-center '>
              <div className='mr-4' >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className='dark:fill-light-gray' fill="#2C3E50" class="bi bi-building" viewBox="0 0 16 16">
                  <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                  <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                </svg> 
              </div>
              <div>
                  <a href="https://www.duoc.cl/carreras/ingenieria-informatica/" className='font-medium text-dark-blue text-md dark:text-light-gray'>{t("about.duoc")}</a>
              </div>
            </div>
            <div className='flex items-center mt-4 '>
              <div className='mr-4' >
                <svg xmlns="http://www.w3.org/2000/svg" className='dark:fill-light-gray' width="25" height="25" fill="#2C3E50" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
              </div>
              <div className='font-medium text-dark-blue text-md cursor-pointer dark:text-light-gray' >
                  Santiago, Chile
              </div>
            </div>
          </div>
          <div className='lg:w-[50%] ' >
            <div>
              <h2  className='tittle my-4 '>
                {t("about.history")} 
              </h2>
            </div>

            <div className='text'> 
              <p>
                Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Sed porttitor lectus nibh. Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet quam id dui posuere blandit. Curabitur aliquet quam id dui posuere blandit. Pellentesque in ipsum id orci porta dapibus. <br /> <br />
                Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada. Cras ultricies ligula sed magna dictum porta. Pellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada. Proin eget tortor risus.            
              </p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default About