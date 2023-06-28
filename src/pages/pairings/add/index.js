
import s from "./index.module.css"
import { useContext, useEffect, useState } from "react"
import { supabase } from '@/lib/supabaseClient'

import Layout from "@/components/Layout/Layout"
import { useRouter } from "next/router"
import PairingsAddComponent from "@/components/PairingsAddComponent/PairingsAddComponent"
import { useQuery } from "@tanstack/react-query"
import { SessionContext } from "@/context/SessionContext"
import Link from "next/link"
export default function Index() {
  const session = useContext(SessionContext);
if (!session) {
  return <div>Please log in.</div> // replace with a redirect to your login page or similar if you like
}
  return (
   <Layout session={session}>
    {session ? <Link href="/dashboard">
    </Link> : <>Please log in.</>}
   </Layout>
  )
}
