import { useState } from "react"
import s from "./login.module.css"
import { supabase } from '../../lib/supabaseClient'
import Layout from "@/components/Layout/Layout"
export default function Login() {
     const [email, setEmail] = useState('')

    async function signInWithEmail() {
        const { data, error } = await supabase.auth.signInWithOtp({
          email,
          options:{
            redirectTo: 'http://localhost:3000/dashboard',
            persistData: true
          } 
        },
        
      
        )
      }
      
  return (
    <Layout>
      <div className={s.container}>
        <div className={s.form}>
            <div className={s.inputbox}>
                <input className={s.input} type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={s.buttonbox}>
               
                <button className={s.button} onClick={signInWithEmail}>Login</button>
            </div>
        </div>
    </div>
    </Layout>
  )
}
