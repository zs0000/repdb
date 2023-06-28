import Dash from "@/components/Dash/Dash"
import s from "./dashboard.module.css"
import { useEffect, useState } from "react"
import { supabase } from '../../lib/supabaseClient'

import Account from "@/components/Account/Account"
import Layout from "@/components/Layout/Layout"
import { useRouter } from "next/router"
import { revalidatePath } from "next/cache"
import { useQuery } from "@tanstack/react-query"
export default function Dashboard() {
  const [session, setSession] = useState(null)
  const [fetching, setFetching] = useState(true)
  const router = useRouter()

  const handleFetchSession = async () => {
    const {data, error} = await supabase.auth.getSession()
    if (data) {
      setSession(data.session)
    }
    return data
  }

  const {data, error, isLoading} = useQuery({queryKey:['sessiondata'], queryFn:handleFetchSession})

  if(!session || isLoading) return <div>Loading...</div>

  return (
   <Layout session={session}>
    {session && session !== null || session !== undefined ? <Dash session={session} /> : <>Please log in.</>}
   </Layout>
  )
}
