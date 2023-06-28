import s from "./Dash.module.css"
import AnimalFormModal from "../AnimalFormModal/AnimalFormModal"
import { useEffect, useState } from "react"
import DashboardAnimalsComponent from "../DashboardAnimalsComponent/DashboardAnimalsComponent"
import DashboardBanner from "../DashboardBanner/DashboardBanner"
import Link from "next/link"
export default function Dash( {session}) {
  
  const [loading, setLoading] = useState(true)
  const [animalType, setAnimalType] = useState("all")

  


  
  if(session === null || session === undefined){
    return <></>
  }

  return (
    <div className={s.container}>
      {session && session !== null || session !== undefined ? <DashboardBanner session={session}/> : <>No login session found.</>}
      
      <div className={s.topcontainer}>
       
     
        <div className={s.actionscontainer}>
          <label className={s.componentlabel}>My Animals</label>
          
            <div className={s.actioncontainer}>
              <div className={s.filtercontainer}>
                <select defaultValue={"all"} className={s.filter} onChange={(e)=>setAnimalType(e.target.value)}>
                  <option  value="all">All</option>
                  <option value="Crested Gecko">Crested Geckos</option>
                  <option value="Ball Python">Ball Pythons</option>
                  </select>
              </div>
              <div className={s.pairingscontainer}>
              <Link className={s.pairings} href="/pairings/add">Add</Link>
              </div>
                {session && session !== null || session !== undefined  ? <AnimalFormModal session={session.user.id}/> : <>No login session found.</> }
            </div>
        </div>
        <div className={s.animalscontainer}>
        {session && session !== null || session !== undefined ? <DashboardAnimalsComponent animalType={animalType} session={session}/> : <>No login session found.</>}
      </div>
    </div>
      
      
    </div>
  )
}
