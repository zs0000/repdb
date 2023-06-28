import { SessionContext } from "@/context/SessionContext";
import s from "./DashboardBanner.module.css"
import { useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DashboardBanner() {
    const [user, setUser] = useState([])

    const session = useContext(SessionContext);
  
    const fetchUserProfile = async () => {
      try {
        if(session === null || session === undefined){
          return
        }
        // select the animals from the supabase database where the animal_owned_by_user_id is equal to the session.user.id
        const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id)
  
        if (error) {
          alert(error.message)
        }
        if(data){
         setUser(data[0])
        }
        return user
      } catch (err) {
        console.error(err.message)
      }
  
      return user
    }
  
    const { data, isLoading, isError, error } = useQuery({
      queryKey:["user-profile"],
      queryFn: fetchUserProfile,
      retry: false
    })
    if(isLoading){
      return <></>
    }
  
    return (
        <div className={s.bannerContainer}>
            <h1 className={s.welcomeText}>Welcome {user.username}!</h1>
            <p className={s.subtitle}>Sample text for now. Placeholder design!</p>
            <div className={s.actionBar}>
                <Link className={s.actionButton} href='/animals/upload'>
                Add Animal
                </Link>
                <button className={s.actionButton}>Action 2</button>
                <button className={s.actionButton}>Action 3</button>
                <button className={s.actionButton}>Action 4</button>
            </div>
        </div>
    )
}
