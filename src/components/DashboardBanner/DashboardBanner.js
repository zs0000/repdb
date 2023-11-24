import { SessionContext } from "@/context/SessionContext";
import s from "./DashboardBanner.module.css"
import { useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DashboardBanner() {

    return (
        <div className={s.bannerContainer}>
            <h1 className={s.welcomeText}>{`Welcome!`}</h1>
            <p className={s.subtitle}>{`We're glad that you're here!.`}</p>
            
        </div>
    )
}
