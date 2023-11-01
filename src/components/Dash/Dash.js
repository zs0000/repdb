import s from "./Dash.module.css"
import AnimalFormModal from "../AnimalFormModal/AnimalFormModal"
import { useEffect, useState } from "react"
import DashboardAnimalsComponent from "../DashboardAnimalsComponent/DashboardAnimalsComponent"
import DashboardBanner from "../DashboardBanner/DashboardBanner"
import Link from "next/link"
import DashboardRecentlyAdded from "../DashboardRecentlyAdded/DashboardRecentlyAdded"
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
       
     
        
        <div className={s.animalscontainer}>
        {session && session !== null || session !== undefined ? <DashboardRecentlyAdded session={session} /> : <>No login session found.</>}
      </div>
    </div>
      
      
    </div>
  )
}
