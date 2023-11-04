import React from 'react'
import s from "./GenerationComponent.module.css"
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'

export default function GenerationComponent({generation, generationIDX}) {
  return (
    <div className={s.container}>
        <div className={s.content}>
            { generation.length > 0 ?
            generation.map((animal) => (
                <div className={s.item} key={animal.animal_id}>
                <BasicAnimalCard animal={animal} />
                </div>
                ))
            :<></>}
        </div>
    </div>
  )
}
