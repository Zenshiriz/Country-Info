import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
export default function Layout(props) {
    const {darkMode, setDarkMode} = props
  return (
    <>
    <div className={`${
        darkMode ? " bg-gray-900" : " bg-slate-50"
      }min-h-screen flex flex-col justify-between`}>
    <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
     <Outlet/> 
     <Footer darkMode={darkMode}/>
     </div>
    </>
  )
}
