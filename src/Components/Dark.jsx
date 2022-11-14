import React, { useState } from "react";
import useDarkSide from "../hook/useDarkSide.jsx";
import { DarkModeSwitch } from 'react-toggle-dark-mode'

export default function Dark() {

    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState( colorTheme == "light" ? true : false);

    const toggleDarkMode = (checked) => {
      setTheme(colorTheme)
      setDarkSide(checked);
    };

    return (
      <div className="hover:scale-110 duration-150 ease-in-out">
      <DarkModeSwitch
            checked={darkSide}
            onChange={toggleDarkMode}
            size={35}
          />
        </div>
    );
}