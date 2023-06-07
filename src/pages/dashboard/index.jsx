import Dash from "@/components/Dash/Dash"
import s from "./dashboard.module.css"
import { useEffect, useState } from "react"
import { supabase } from '../../lib/supabaseClient'

import Account from "@/components/Account/Account"
import Layout from "@/components/Layout/Layout"
import { useRouter } from "next/router"
export default function Dashboard() {
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
    {session ? <Dash session={session} /> : <>Please log in.</>}
   </Layout>
  )
}
