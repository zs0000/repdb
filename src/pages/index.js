import Image from 'next/image'
import { Inter } from 'next/font/google'
import s from "../styles/home.module.css"
import Layout from '@/components/Layout/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import Hero from '@/components/Hero/Hero'
import Navbar from '@/components/Navbar/Navbar'
import LandingInfo from '@/components/LandingInfo/LandingInfo'
import { useSessionData } from '@/hooks/useSessionData'
import Head from 'next/head'


export default function Home() {
  const [session, setSession] = useState(null)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()
  const {data, status} = useSessionData();
  if (status === 'loading'){
    return <div>Loading...</div>
  }
  if (status === 'error'){
    console.log(data)
    return <div>error occured</div>
  }

  return (
    
      <div className={s.container}>
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
        <div className={s.navbar}>
          <Navbar session={data.session}/>
          </div>
        <div className={s.content}>
          <Hero/>
          <LandingInfo/>
          {/* Lineage tracking simplified */} 
          {/* Footer */}
        </div>
      </div>
  
  )
}
