import { useState } from "react"
import s from "./TreeParent.module.css"
import TreeLeaf from "../TreeLeaf/TreeLeaf"

export default function TreeParent({parents}) {
    console.log(parents)
    const [twoParents, setTwoParents] = useState(true)
  return (
    <div className={s.container}>
        
        <div className={ s.content}>
            <div className={s.parentone}>
                <TreeLeaf animal={parents.mom} />
            </div>
            <div className={s.connector}>
                <div className={s.horizontalconnector}>

                </div>
                <div className={s.verticalconnector}>

                </div>
            </div>
            <div className={s.parenttwo}>
                <TreeLeaf animal={parents.dad} />
            </div> 
           
            
        </div>
    </div>
  )
}
