import s from "./Dash.module.css"
import Account from '../Account/Account'
import DashboardAnimals from "../DashbordAnimals/DashboardAnimals"
import AnimalFormModal from "../AnimalFormModal/AnimalFormModal"
import { useEffect, useState } from "react"
import DashboardAnimalsComponent from "../DashboardAnimalsComponent/DashboardAnimalsComponent"
import DashboardBanner from "../DashboardBanner/DashboardBanner"
export default function Dash( {session}) {
  console.log(session)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    if(session && session !== null || session !== undefined){
      setLoading(false)
    }
  },[session])
  if(!session || loading){
    return <></>
  }

  return (
    <div className={s.container}>
      <DashboardBanner/>
      
      <div className={s.topcontainer}>
       

        <div className={s.actionscontainer}>
            <div className={s.actioncontainer}>
                <AnimalFormModal session={session.user.id}/> 
            </div>
        </div>
    </div>
      
      <div className={s.animalscontainer}>
        {session ? <DashboardAnimalsComponent session={session}/> : <>No login session found.</>}
      </div>
    </div>
  )
}
