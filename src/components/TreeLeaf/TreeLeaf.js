import React from 'react'
import s from "./TreeLeaf.module.css"
export default function TreeLeaf({animal}) {
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.namecontainer}>
                <span className={s.name}>{animal.animal_name}</span>
            </div>
        </div>
    </div>
  )
}
