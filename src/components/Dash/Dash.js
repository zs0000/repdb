import s from "./Dash.module.css"
import Account from '../Account/Account'
import DashboardAnimals from "../DashbordAnimals/DashboardAnimals"
export default function Dash( {session}) {
  console.log(session)
 
  return (
    <div className={s.container}>
      <div className={s.topcontainer}>
        {session.user.role}
      </div>
      <div className={s.animalscontainer}>
        <DashboardAnimals session={session}/>
      </div>
   
    </div>
  )
}
