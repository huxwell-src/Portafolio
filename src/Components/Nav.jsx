import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import Dark from './Dark'
import BurgerButton from './BurgerButton'
import {useTranslation} from "react-i18next"
 
export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [t, i18n] = useTranslation("global");
 
  const navList = (

    

    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      
        <a href="#inicio" className="flex items-center text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue">
            {t("nav.home")}
        </a>
        <a href="#About" className="flex items-center text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue">
            {t("nav.about")} 
        </a>     
        <a href="#skills" className="flex items-center text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue">
            {t("nav.skills")}
        </a>
        <a href="#proyectos" className="flex items-center text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue">
            {t("nav.projects")}
        </a>
        <a href="#contacts" className="flex items-center text-dark-blue hover:text-light-blue font-semibold duration-150 ease-in-out dark:text-light-gray dark:hover:text-hyper-light-blue">
            {t("nav.contacts")}
        </a>
        
    </ul>
  );
 
  return (
    <Navbar className="mx-auto md:w-10/12 py-2 px-4 lg:px-8 lg:py-4 shadow-none dark:bg-hyper-dark-blue border-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className='text-5xl font-bold text-dark-blue font-roboto dark:text-light-gray before:content-["</"] after:content-[">"] '>
            NGB 
        </div>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden lg:flex">
            <div className='flex  items-start mx-4'>
                <Tooltip content="English" >
                    <button className='text-light-blue font-poppins font-semibold  dark:text-light-gray flex items-center'
                    onClick={() => i18n.changeLanguage("en")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" className='mx-2 my-1 hover:scale-125 active:scale-100 duration-300 ease-in-out'>
                            <mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/>
                            </mask><g mask="url(#a)">
                            <path fill="#eee" d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"/>
                            <path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"/>
                            <path fill="#0052b4" d="M0 0h256v256H0Z"/>
                            <path fill="#eee" d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"/>
                            </g>
                        </svg>    
                    </button>
                </Tooltip>
                <Tooltip content="Español" >
                    <button className='text-light-blue font-poppins font-semibold  dark:text-light-gray  flex items-center'
                    onClick={() => i18n.changeLanguage("es")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512" className='mx-2 my-1 hover:scale-125 active:scale-100 duration-300 ease-in-out'>
                            <mask id="a"><circle cx="256" cy="256" r="256" fill="#fff"/></mask>
                            <g mask="url(#a)"><path fill="#d80027" d="m0 256 254.5-51.3L512 256v256H0z"/>
                            <path fill="#0052b4" d="M0 0h256l52.7 132.8L256 256H0z"/>
                            <path fill="#eee" d="M256 0h256v256H256zM152.4 89l16.6 51h53.6l-43.4 31.6 16.6 51-43.4-31.5-43.4 31.5 16.6-51L82.2 140h53.6z"/></g>
                        </svg>   
                    </button>
                </Tooltip>
            </div>
            <Dark/>
        </div>
        <IconButton
          variant="text"
          className="ml-auto dark:text-light-gray text-dark-blue h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex justify-between">
          <Button variant="gradient" size="sm"  className="bg-amber-500 w-full rounded-full" onClick={() => i18n.changeLanguage("es")}>
            <span>Español</span>
          </Button>
          <Button variant="gradient" size="sm"  className="bg-teal-800 w-full rounded-full" onClick={() => i18n.changeLanguage("en")}>
            <span>Ingles</span>
          </Button>
        </div>
      </MobileNav>
      
    </Navbar>
  );
}