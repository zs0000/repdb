import React from 'react'
import s from "./TreeLeaf.module.css"
import AnimalCard from '../AnimalCard/AnimalCard'
import Image from 'next/image'
export default function TreeLeaf({animal}) {
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.photocontainer}>
                <Image src={animal.photos[0].img_url} fill style={{objectFit:'cover'}} alt="Reptile photo" className={s.photo} />
            </div>
            <div className={s.namecontainer}>
                <span className={s.name}>
                    {animal.animal_name}
                </span>
            </div>
        </div>
    </div>
  )
}
