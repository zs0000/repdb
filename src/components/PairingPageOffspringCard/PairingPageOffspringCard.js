import React from 'react'
import s from "./PairingPageOffspringCard.module.css"
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'
import Image from 'next/image'
export default function PairingPageOffspringCard({kid, onImageClick }) {

  const colors = [
    "#647C90", // Slate Grey
    "#92A8D1", // Soft Blue
    "#B5B2A1", // Warm Grey
    "#C2C2F0", // Lavender
    "#95B8D1", // Soft Sky Blue
    "#E0E0E0", // Light Grey
    "#B8A9C9", // Soft Purple
    "#D1D1E0", // Pale Blue
    "#A1C181", // Sage Green
    "#FFD1DC", // Pale Pink
    "#FEE1E8", // Lightest Pink
    "#B9E2A0", // Light Green
    "#A0D2DB", // Light Teal
    "#FFEB99", // Pale Yellow
    "#A7BED3", // Dusty Blue
    "#C6E2E9", // Powder Blue
    "#F0E6EF", // Very Pale Purple
    "#D4B9CB", // Soft Rose
    "#F7F5E6", // Eggshell
    "#D4E2D4", // Pale Green
  ];
  console.log(kid)
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.photocontainer}>
              <Image onClick={()=>onImageClick(kid.photos[0].img_url)} src={kid.photos[0].img_url} alt={kid.animal_name} className={s.photo} fill style={{objectFit:'cover'}} />
              <div className={s.namecontainer}>
                <span className={s.name}>
                  {kid.animal_name}
                </span>
              </div>
            </div>
            <div className={s.genes}>
                {kid.animal_gene_traits.slice(0,3).map((gene)=>(
                  <div key={kid.animal_name + gene} className={s.gene}>
                    <div  className={s.genebubble}>
                      {gene[0]}
                    </div>
                    <div  className={s.genelabel}>
                    {gene}
                    </div>
               
                  </div>
                                    ))}
            </div>
        </div>
    </div>
  )
}
