import { SessionContext } from "@/context/SessionContext";
import s from "./DashboardBanner.module.css"
import { useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DashboardBanner({session}) {
      console.log(session)
  
    return (
        <div className={s.bannerContainer}>
            <h1 className={s.welcomeText}>Welcome {session.user.username}!</h1>
            <p className={s.subtitle}>Sample text for now. Placeholder design!</p>
            
        </div>
    )
}
