import { useState } from "react"
import s from "./login.module.css"
import { supabase } from '../../lib/supabaseClient'
import Layout from "@/components/Layout/Layout"
import Navbar from "@/components/Navbar/Navbar"
export default function Login() {
     const [email, setEmail] = useState('')
     const [buttonDisabled, setButtonDisabled] = useState(false)

  //function that re-enables the button after 5 seconds
  const enableButton = () => {
    setButtonDisabled(false)
  }

  //function that disables the button when clicked
  const disableButton = () => {
    setButtonDisabled(true)
    setTimeout(enableButton, 5000)
  }

    async function signInWithEmail() {

        const { data, error } = await supabase.auth.signInWithOtp({
          email,
          options:{
            redirectTo: 'http://localhost:3000/dashboard',
            persistData: true
          } 
        },
        
      
        )

        if (error) {
          alert(error.error_description || error.message)
        } else {
          alert('Check your email for the login link!')
          disableButton()
        }
      }
      
  return (
   
      <div className={s.container}>
        <div className={s.navbar}>
          <Navbar />
        </div>
        <div className={s.content}>
        <div className={s.form}>
          <div className={s.formlabel}>
            <span className={s.label}>
              Login/Register
            </span>
          </div>
            <div className={s.items}>
            <div className={s.inputbox}>
                <input className={s.input} type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={s.buttonbox}>
               
                <button disabled={buttonDisabled} className={buttonDisabled ? s.disabledButton :  s.button } onClick={signInWithEmail}>Login</button>
            </div>
            </div>
        </div>
        </div>
    </div>

  )
}
