import React from 'react'
import { Arimo } from 'next/font/google'
import s from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'

const inter = Arimo({ subsets: ['latin'] })
export default function Layout({children}) {
  return (
    <div className={inter.className} style={{padding: "0px", margin: "0px", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Navbar/>
        {children}
    </div>
  )
}
