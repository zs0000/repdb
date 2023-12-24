import React, { useEffect, useState } from 'react'
import { Montserrat } from 'next/font/google'
import s from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import { supabase } from '@/lib/supabaseClient'
import MobileBar from '../MobileBar/MobileBar'
import Sidebar from '../Sidebar/Sidebar'
import { useRouter } from 'next/router'
import Head from 'next/head'

const inter = Montserrat({ subsets: ['latin'] })
export default function Layout({children, session}) {
  
  return (
    <div className={`${inter.className} w-full h-full min-h-screen flex flex-col items-center justify-center bg-white`} style={{padding: "0px", margin: "0px", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <Head>
      <title>
        GeneLink: Simplified tracking and reptile lineage sharing.
      </title>
      <link rel="icon" href="/gl.ico" />
      <link rel="apple-touch-icon" href="/gl.ico"></link>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property='og:type' content='website' key='type' />
      <meta property='og:url' content='https://mygenelinks.com/' key='url' />
      <meta property='og:image' content='/high_ss.png' key='image' />
      <meta property='og:title' content='GeneLink: Track and Share reptile lineage.' key='title' />
      <meta property='og:description' content='A tool for reptile enthusiast and commercial breeders to easily track and share the lineage for their reptiles.' key='description' />
      </Head>
        <Navbar session={session}/>
        <div className={s.container}>
          <div className={s.sidebar}>
           {session && <Sidebar session={session}/> }
          </div>
          <div className={s.content}>
            {children}
          </div>
        </div>
        
    </div>
  )
}
