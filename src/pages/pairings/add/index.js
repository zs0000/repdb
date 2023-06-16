
import s from "./index.module.css"
import { useEffect, useState } from "react"
import { supabase } from '@/lib/supabaseClient'

import Layout from "@/components/Layout/Layout"
import { useRouter } from "next/router"
import PairingsAddComponent from "@/components/PairingsAddComponent/PairingsAddComponent"
export default function Index() {
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
    {session ? <PairingsAddComponent session={session} /> : <>Please log in.</>}
   </Layout>
  )
}
