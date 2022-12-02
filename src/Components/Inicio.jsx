import React, { Component } from 'react';
import './css/inicio.css';
import {useTranslation} from "react-i18next";
import Dark from './Dark'

export const Inicio = () => {

  const [t, i18n] = useTranslation("global");

  return (
    <section className=' bg-slate-900 w-10/12  h-screen pt-20 m-auto before:c dark:bg-hyper-dark-blue' id='inicio'>
      <div className='flex flex-row-reverse md:hidden w-[89vw] '>
        <Dark/>
      </div>
      <p className='text-dark-blue z-20 before:content-["<"] after:content-["/>"] dark:text-light-gray invisible md:visible'>Section</p>
         <div className='bg-slate-900 w-full h-[90%] flex flex-col-reverse md:flex-row  items-center md:justify-between  justify-evenly '>
        {/* 
        <svg className='absolute md:top-28 md:scale-90 md:left-4 xl:scale-90 xl:top-28 xl:left-6 2xl:bottom-2/4 2xl:right-3/4 z-0' width="361" height="319" viewBox="0 0 361 319" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M361 138C361 237.687 280.187 318.5 180.5 318.5C80.8126 318.5 0 237.687 0 138C0 38.3126 80.8126 0 180.5 0C280.187 0 361 38.3126 361 138Z" fill="url(#paint0_linear_26_7)"/>
          <defs>
          <linearGradient id="paint0_linear_26_7" x1="180.5" y1="0" x2="180.5" y2="318.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3498DB" stopOpacity="0.65"/>
          <stop offset="1" stopColor="white" stopOpacity="0.65"/>
          </linearGradient>
          </defs>
        </svg>

        <svg className='absolute md:bottom-12 md:scale-90 md:left-[-2rem] xl:bottom-4 xl:scale-75 xl:left-36 2xl:left-1/3 2xl:bottom-44' width="324" height="304" viewBox="0 0 324 304" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="162" cy="152" rx="162" ry="152" fill="url(#paint0_linear_26_8)"/>
          <defs>
          <linearGradient id="paint0_linear_26_8" x1="162" y1="0" x2="162" y2="304" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3498DB" stopOpacity="0.65"/>
          <stop offset="1" stopColor="white" stopOpacity="0.65"/>
          </linearGradient>
          </defs>
        </svg>

        <svg className='absolute md:right-80 md:top-40 xl:right-1/3 xl:top-20 xl:scale-90 2xl:right-1/3 2xl:top-1/4 z-0' width="164" height="164" viewBox="0 0 164 164" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="82" cy="82" r="82" fill="url(#paint0_linear_26_9)"/>
          <defs>
          <linearGradient id="paint0_linear_26_9" x1="82" y1="0" x2="82" y2="164" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3498DB" stopOpacity="0.65"/>
          <stop offset="1" stopColor="white" stopOpacity="0.65"/>
          </linearGradient>
          </defs>
        </svg>

        */}

        
          <div className='z-20 w-[95vw] '>
            <ul className='flex md:flex-col' >
              <li>
                <a href="https://github.com/huxwell-src"  target="_blank">  
                <svg xmlns="http://www.w3.org/2000/svg" className='hover:scale-125 duration-150 ease-in-out' viewBox="0 0 48 48" width="80px" height="80px">
                  <path fill="#2100c4" d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h12.36 C38.199,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"/>
                  <path fill="#ddbaff" d="M37,23.5c0-2.897-0.875-4.966-2.355-6.424C35.591,15.394,34.339,12,34.339,12 c-2.5,0.5-4.367,1.5-5.609,2.376C27.262,14.115,25.671,14,24,14c-1.71,0-3.339,0.118-4.834,0.393 c-1.242-0.879-3.115-1.889-5.632-2.393c0,0-1.284,3.492-0.255,5.146C11.843,18.6,11,20.651,11,23.5 c0,6.122,3.879,8.578,9.209,9.274C19.466,33.647,19,34.764,19,36l0,0.305c-0.163,0.045-0.332,0.084-0.514,0.108 c-1.107,0.143-2.271,0-2.833-0.333c-0.562-0.333-1.229-1.083-1.729-1.813c-0.422-0.616-1.263-2.032-3.416-1.979 c-0.376-0.01-0.548,0.343-0.5,0.563c0.043,0.194,0.213,0.5,0.896,0.75c0.685,0.251,1.063,0.854,1.438,1.458 c0.418,0.674,0.417,2.468,2.562,3.416c1.53,0.677,2.988,0.594,4.097,0.327l0.001,3.199c0,0.639-0.585,1.125-1.191,1.013 C19.755,43.668,21.833,44,24,44c2.166,0,4.243-0.332,6.19-0.984C29.584,43.127,29,42.641,29,42.002L29,36 c0-1.236-0.466-2.353-1.209-3.226C33.121,32.078,37,29.622,37,23.5z"/>
                  <path fill="#ddbaff" d="M15,18l3.838-1.279c1.01-0.337,1.231-1.684,0.365-2.302l-0.037-0.026 c-2.399,0.44-4.445,1.291-5.888,2.753C13.596,17.658,14.129,18,15,18z"/><path fill="#ddbaff" d="M28.693,14.402c-0.878,0.623-0.655,1.987,0.366,2.327L32.872,18c0.913,0,1.461-0.37,1.773-0.924 c-1.46-1.438-3.513-2.274-5.915-2.701C28.717,14.384,28.705,14.393,28.693,14.402z"/>
                  <path fill="#ddbaff" d="M24,31c-1.525,0-2.874,0.697-3.791,1.774C21.409,32.931,22.681,33,24,33s2.591-0.069,3.791-0.226 C26.874,31.697,25.525,31,24,31z"/>
                </svg>
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/nicolás-gonzález-berrios"  target="_blank"> 
                  <svg xmlns="http://www.w3.org/2000/svg" className='hover:scale-125 duration-150 ease-in-out'  viewBox="0 0 48 48" width="80px" height="80px">
                    <path fill="#0288d1" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"/>
                    <path fill="#fff" d="M14 19H18V34H14zM15.988 17h-.022C14.772 17 14 16.11 14 14.999 14 13.864 14.796 13 16.011 13c1.217 0 1.966.864 1.989 1.999C18 16.11 17.228 17 15.988 17zM35 24.5c0-3.038-2.462-5.5-5.5-5.5-1.862 0-3.505.928-4.5 2.344V19h-4v15h4v-8c0-1.657 1.343-3 3-3s3 1.343 3 3v8h4C35 34 35 24.921 35 24.5z"/>
                  </svg>
                </a>
              </li>

              <li>
                <a href="#contact"> 
                  <svg xmlns="http://www.w3.org/2000/svg" className='hover:scale-125 duration-150 ease-in-out'  viewBox="0 0 48 48" width="80px" height="80px">
                    <path fill="#e0e0e0" d="M5.5,40.5h37c1.933,0,3.5-1.567,3.5-3.5V11c0-1.933-1.567-3.5-3.5-3.5h-37C3.567,7.5,2,9.067,2,11v26C2,38.933,3.567,40.5,5.5,40.5z"/>
                    <path fill="#d9d9d9" d="M26,40.5h16.5c1.933,0,3.5-1.567,3.5-3.5V11c0-1.933-1.567-3.5-3.5-3.5h-37C3.567,7.5,2,9.067,2,11L26,40.5z"/>
                    <path fill="#eee" d="M6.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L6.745,40.5z"/>
                    <path fill="#e0e0e0" d="M25.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L18.771,31.616L25.745,40.5z"/>
                    <path fill="#ca3737" d="M42.5,9.5h-37C3.567,9.5,2,9.067,2,11v26c0,1.933,1.567,3.5,3.5,3.5H7V12h34v28.5h1.5c1.933,0,3.5-1.567,3.5-3.5V11C46,9.067,44.433,9.5,42.5,9.5z"/>
                    <path fill="#f5f5f5" d="M42.5,7.5H24H5.5C3.567,7.5,2,9.036,2,11c0,1.206,1.518,2.258,1.518,2.258L24,27.756l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.036,44.433,7.5,42.5,7.5z"/>
                    <path fill="#e84f4b" d="M43.246,7.582L24,21L4.754,7.582C3.18,7.919,2,9.297,2,11c0,1.206,1.518,2.258,1.518,2.258L24,27.756l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.297,44.82,7.919,43.246,7.582z"/>
                  </svg>
                </a>
              </li>

            </ul>
          </div>
          <div className='text-end z-10 mr-6 w-screen'>
              <h1 className='md:text-7xl text-5xl	 text-dark-blue dark:text-light-gray text-right font-black before:content-["<h1>"] before:invisible md:before:visible dark:before:text-light-gray'>
              {t("home.me")} <br />
                  <span className='text-light-blue dark:text-hyper-light-blue before:content-["<h1>"] before:invisible md:before:visible dark:before:text-light-gray'>    
                  {t("home.dev")} <br />
                  {t("home.front")}
                  </span>
              </h1>
              <button className='bg-dark-blue dark:bg-light-gray w-36 h-11 text-light-gray dark:text-dark-blue rounded-full border-none font-semibold mt-2.5 hover:scale-125 active:scale-100 duration-200 ease-in-out'>
                <a href="public\NicolasGonzalez.pdf" >{t("home.cv")}</a>
              </button>
          </div>
          <div class='scroll border-solid border-2 border-dark-blue dark:border-light-gray invisible md:visible '></div>
        </div> 
        <p className='text-dark-blue before:content-["<"] after:content-["/>"] dark:text-light-gray invisible md:visible ' >Section</p>

        
    </section>
  )
}


