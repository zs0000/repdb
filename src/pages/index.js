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
