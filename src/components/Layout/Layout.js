import React, { useEffect, useState } from 'react'
import { Arimo } from 'next/font/google'
import s from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import { supabase } from '@/lib/supabaseClient'

const inter = Arimo({ subsets: ['latin'] })
export default function Layout({children, session}) {
 
  return (
    <div className={`${inter.className} w-full h-full min-h-screen flex flex-col items-center justify-center bg-gray-50`} style={{padding: "0px", margin: "0px", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <Navbar session={session}/>
        {children}
    </div>
  )
}
