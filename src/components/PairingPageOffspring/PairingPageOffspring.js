import React from 'react'
import s from "./PairingPageOffspring.module.css"
import PairingPageOffspringCard from '../PairingPageOffspringCard/PairingPageOffspringCard'

export default function PairingPageOffspring({kids, onImageClick}) {
  

  
  return (
    <div className={s.container}>
      <div className={s.labelcontainer}>
        <span className={s.label}>
          Offspring
        </span>
      </div>
        <div className={s.content}>
          {kids.length ? kids.map((kid) => (
            <div key={kid.animal.animal_id} className={s.kid}>
              <PairingPageOffspringCard onImageClick={onImageClick} kid={kid.animal} />
            </div>
          )) : <div>No kids yet!</div>}
        </div>
    </div>
  )
}
