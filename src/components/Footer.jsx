import React from 'react'

export default function Footer(props) {
    const {darkMode} = props
  return (
    <footer className={`transition duration-150 ease-in-out sh shadow-lg px-4 py-4 text-sm lg:text-base flex justify-between ${darkMode ? " bg-slate-950 text-gray-50": "bg-slate-200 text-gray-900"}`} >
      &copy; Around the world 
      <div>
       all right preserved {new Date().getFullYear().toString()}
      </div>
    </footer>
  )
}
