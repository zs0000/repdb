import React from 'react'
import s from "./TreeLeaf.module.css"
import AnimalCard from '../AnimalCard/AnimalCard'
export default function TreeLeaf({animal}) {
  return (
    <div className={s.container}>
        <div className={s.content}>
            {animal.animal_name}
        </div>
    </div>
  )
}
