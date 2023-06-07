import Image from 'next/image'
import { Inter } from 'next/font/google'
import s from "../styles/home.module.css"
import Layout from '@/components/Layout/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'


export default function Home() {
  const [session, setSession] = useState(null)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    setFetching(false)
  }, [])
  if(fetching){
    return<></>
  }
  return (
    <Layout session={session}>
      <div className={s.container}>
      
      </div>
    </Layout>
  )
}
