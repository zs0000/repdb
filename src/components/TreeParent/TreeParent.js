import { useState } from "react"
import s from "./TreeParent.module.css"

export default function TreeParent() {
    const [twoParents, setTwoParents] = useState(true)
  return (
    <div className={s.container}>
        <div className={s.buttoncontainer}>
            <button className={s.button} onClick={(e)=> setTwoParents(!twoParents)}>
                Toggle Parent(s)
            </button>
        </div>
        <div className={twoParents ? s.content : s.othercontent}>
            <div className={s.parentone}>
            Parent 1
            </div>
            {twoParents ? <>
            <div className={s.connector}>
                <div className={s.horizontalconnector}>

                </div>
                <div className={s.verticalconnector}>

                </div>
            </div>
            <div className={s.parenttwo}>
                Parent 2
            </div> 
            </>
            : 
            <>
            <div className={s.connector}>
                <div className={s.verticalconnector}>

                </div>
                </div>
            </>}
        </div>
    </div>
  )
}
