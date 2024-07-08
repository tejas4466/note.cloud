import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'




function Layout() {
    const darkMode=useSelector((state)=>state.ui.darkMode)

    useEffect(()=>{
        if(darkMode){
            document.querySelector('html').classList.remove("light","dark")
            document.querySelector('html').classList.add("dark")
        }
        else{
            document.querySelector('html').classList.remove("light","dark")
            document.querySelector('html').classList.add("light")
        }
    },[darkMode])



  return (
  <>
    <Navbar/>
    <Outlet/>
    <Footer/>
</>
  )
}

export default Layout
