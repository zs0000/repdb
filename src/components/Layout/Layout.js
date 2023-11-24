import React, { useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'
import s from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import { supabase } from '@/lib/supabaseClient'
import MobileBar from '../MobileBar/MobileBar'
import Sidebar from '../Sidebar/Sidebar'

const inter = Montserrat({ subsets: ['latin'] })
export default function Layout({children, session}) {
 
  return (
    <div className={`${inter.className} w-full h-full min-h-screen flex flex-col items-center justify-center bg-white`} style={{padding: "0px", margin: "0px", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Navbar session={session}/>
        <div className={s.container}>
          <div className={s.sidebar}>
            <Sidebar session={session}/>
          </div>
          <div className={s.content}>
            {children}
          </div>
        </div>
        
    </div>
  )
}
