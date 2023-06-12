import AnimalFormModal from "../AnimalFormModal/AnimalFormModal"
import s from "./DashActionBar.module.css"

export default function DashActionBar() {
  return (
    <div className={s.container}>
        <div className={s.actionscontainer}>
            <div className={s.actioncontainer}>
                <AnimalFormModal/>
            </div>
        </div>
    </div>
  )
}
