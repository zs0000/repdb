import { useState } from "react"
import s from "./SignInModal.module.css"
import { supabase } from "@/lib/supabaseClient"

export default function SignInModal({onClick}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const handleLogin = async (event) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error.error_description || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className={s.container}>
            <div className={s.inputcontainer}>
                <input onChange={(e)=>setEmail(e.target.value)} className={s.input} placeholder="Email" type="text"/>
                <button onClick={handleLogin} className={s.button}>Sign in</button>
            </div>
    </div>
  )
}
