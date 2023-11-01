import Dash from "@/components/Dash/Dash"
import s from "./dashboard.module.css"
import Layout from "@/components/Layout/Layout"
import DashboardSidebar from "@/components/DashboardSidebar/DashboardSidebar"
import { useUserAnimalData } from "@/hooks/useUserAnimals"
import { useSessionData } from "@/hooks/useSessionData"
import { useRouter } from "next/router"
import Sidebar from "@/components/Sidebar/Sidebar"

export default function Dashboard() {
  const router = useRouter()

  const {data, status} = useSessionData()

  if(status === "loading") return <div>Loading...</div>
  if(status === "error") return <div>Error...</div>
  if(data.session === null){
    router.push("/login")
    return <div>Redirecting...</div>
  }
  return (
   <Layout session={data.session}>
   <div className={s.container}>
   <div className={s.sidebar}>
        <Sidebar/>
      </div>
    <div className={s.content}>
      
      <Dash session={data.session} />
    </div>
   </div>
   
   </Layout>
  )
}
