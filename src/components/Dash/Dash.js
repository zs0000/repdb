import s from "./Dash.module.css"
import Account from '../Account/Account'
import DashboardAnimals from "../DashbordAnimals/DashboardAnimals"
import AnimalFormModal from "../AnimalFormModal/AnimalFormModal"
import { useEffect, useState } from "react"
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
      <div className={s.topcontainer}>
        {session.user.role}
      <div className={s.actionsbarcontainer}>
        <div className={s.actionscontainer}>
            <div className={s.actioncontainer}>
                {session ? <AnimalFormModal session={session.user.id}/> : <></>}
            </div>
        </div>
    </div>
      </div>
      <div className={s.animalscontainer}>
        {session ? <DashboardAnimals session={session}/> : <>No login session found.</>}
      </div>
   
    </div>
  )
}
