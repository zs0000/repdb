import Dash from "@/components/Dash/Dash"
import s from "./dashboard.module.css"
import Layout from "@/components/Layout/Layout"
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar"
import { useUserAnimalData } from "@/hooks/useUserAnimals"
import { useSessionData } from "@/hooks/useSessionData"
import { useRouter } from "next/router"
import Sidebar from "@/components/Sidebar/Sidebar"
import { useState } from "react"
import Onboarding from "@/components/Onboarding/Onboarding"

export default function Dashboard() {
  const router = useRouter()

  const {data, status} = useSessionData()
  const [onboarding, setOnboarding] = useState(false)

  if(status === "loading") return <div>Loading...</div>
  if(status === "error") return <div>Error...</div>
  if(data.session === null){
    router.push("/login")
    return <div>Redirecting...</div>
  }


  return (
   <Layout session={data.session}>
    <div className={s.content}>
      
   {data.session && data.session?.user?.username ? 
   <Dash session={data.session} /> : <Onboarding session={data.session}/> }
    </div> 
   </Layout>
  )
}
