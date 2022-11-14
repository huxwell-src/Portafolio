import { useState } from "react";

export default function Dark() {

    return (
        <label htmlFor="check" className="bg-hyper-dark-blue w-12 h-6 rounded-full relative cursor-pointer dark:bg-light-gray">
          <input type="checkbox" id="check" className="sr-only peer"/>
          <span className="w-2/5 h-4/5 bg-day absolute rounded-full  top-[2.5px] left-0.5 scale-150 bg-sun  bg-no-repeat	bg-center bg-75%
          peer-checked:bg-dark-blue peer-checked:left-7 transition-all duration-300 peer-checked:bg-moon"></span>
        </label> 
    );
}