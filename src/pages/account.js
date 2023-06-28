import Image from 'next/image'
import { Inter } from 'next/font/google'
import s from "../styles/home.module.css"
import Layout from '@/components/Layout/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'
import Account from '@/components/Account/Account'


export default function AccountPage() {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()

  async function getUserDetails() {
    try {
        console.log(session.user.id)
        const {data, error} = await supabase.from('profiles').select('*').eq('id', session.user.id)
        if(error){
            throw error
        }
        if(data){
            setUser(data)
            console.log(data)
        }
    } catch (error) {
        console.log(error)
    }
    }
  

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
   
    
    
    // supabase listener for auth state changes

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  
    setFetching(false)
  }, [])

  useEffect(() => {
    if(session){
        getUserDetails()
    }
    }, [session])

  if(fetching){
    return<></>
  }
  return (
    <Layout session={session}>
      <div className={s.container}>
        {session ? 
            <Account session={session} />
            :
            <>
            Not logged in
            </>
    }
      </div>
    </Layout>
  )
}
