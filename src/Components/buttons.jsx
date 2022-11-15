import React from 'react'
import {useTranslation} from "react-i18next"

const Nav = () => {

  const [t, i18n] = useTranslation("global");

  return (
    <div>
      <h2> {t("skills.skills")} </h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae mollitia earum sint, corrupti minima, quod maxime facere similique delectus at, quae optio suscipit exercitationem eum quos? Hic possimus ex nisi?</p>
      <h2> {t("skills.tools")} </h2>
      <button> {f("skills.important")} </button>
      <button> {f("skills.database")} </button>
      <button> {f("skills.framework")} </button>
      <button> {f("skills.languages")} </button>
      <button> {f("skills.lowcode")} </button>
      <button> {f("skills.mobile")} </button>
    </div>
  )
}

export default buttons