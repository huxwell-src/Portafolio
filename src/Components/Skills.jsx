import React from 'react'
import { useState } from 'react'
import { ButtonList, LogoList } from '../Components'
import data from '../data/data'
import {useTranslation} from "react-i18next";


export const Skills = () => {
  
  const allCategories = ['All', ...new Set(data.map(logo => logo.category ))]

  const [categories, setCategories] = useState(allCategories)
  const [logo, setLogo] = useState(data)

  const filterCategory = (category) => {
    if (category === "All"){
      setLogo(data)
      return
    }

    const filterData = data.filter(logo => logo.category === category)
     setLogo(filterData)
  }

  const [t, i18n] = useTranslation("global");

  return (
    <section id='skills' className='my-10'>
        <div className='md:w-10/12 w-[100vw] m-auto flex flex-col  sm:flex-row justify-between '>
            <div className='lg:w-[50%]'> 
              <h2 className='tittle ml-6'>{t("skills.skills")}</h2>
              <p className='text md:ml-6 mx-6 mb-6 mt-3'>{t("skills.desc")}</p>
              <h2 className='tittle md:ml-6 mx-6'>{t("skills.tools")}</h2>
              <ButtonList categories={categories} filterCategory={filterCategory} />
            </div>
            <div className='lg:w-[50%]'>
              <LogoList logo={logo} />
            </div>
        </div>
    </section>
  )
}
