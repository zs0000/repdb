import Dash from "@/components/Dash/Dash"
import s from "./dashboard.module.css"
import { useEffect, useState } from "react"
import { supabase } from '../../lib/supabaseClient'
import Login from "../login"
import Account from "@/components/Account/Account"
export default function Dashboard() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <div className={s.container}>
      {!session ? <Login /> : <Dash  key={session.user.id} session={session}/>}       
    </div>
  )
}
