import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
   const {darkMode, setDarkMode} = props;

    function toggleDarkMode(){
      setDarkMode(prevMode => !prevMode)
       
    }
    console.log(darkMode)
  return (
    <>
      <header className={`flex justify-between p-3 md:px-8 lg:px-14 transition duration-150 ease-in-out sh shadow-lg ${darkMode ? " bg-slate-950": "bg-slate-200"}`}>
      <Link to="/">
        <h2 className={`transition duration-150 ease-in-out ${darkMode?" text-gray-50" : "text-gray-900"} font-bold text-xl lg:text-2xl`}>Around the World</h2>
        </Link>
        <div className="flex items-center justify-center" onClick={toggleDarkMode}>
          <div className="relative hover:cursor-pointer">
            <div className={`block border-[1px]  w-12 h-6 md:w-14 md:h-8 rounded-full transition duration-150 ease-in-out  ${darkMode? "border-gray-50":" border-slate-950"}`}></div>
            <div className={`dot absolute  w-5 h-5 md:w-6 md:h-6 md:top-1 top-[2.3px] rounded-full transition duration-300 ease-in-out ${darkMode ?"right-[2px] md:right-1 bg-gray-50":"left-[2px] md:left-1 bg-slate-950"}`}></div>
          </div>
          <div className={`${darkMode?" text-gray-50" : "text-gray-900"} ml-2 font-medium lg:text-lg transition duration-150 ease-in-out text-sm`}>
            Dark Mode
          </div>
        </div>
      </header>
    </>
  );
}
