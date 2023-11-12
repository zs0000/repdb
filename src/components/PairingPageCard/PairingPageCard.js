import React from 'react'
import s from './PairingPageCard.module.css'
import Image from 'next/image'

export default function PairingPageCard({animal, onImageClick}) {
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


      console.log(animal)
      
  return (
    <div className={s.container}>
        <div className={s.content}>
            
            <div className={s.photocontainer}>
                <Image src={animal.photos[0].img_url} className={s.photo} onClick={()=>onImageClick(animal.photos[0].img_url)} alt='Picture of a reptile' fill style={{objectFit:'cover'}} />
                <div className={s.namecontainer}>
                    <span className={s.name}>
                        {animal.animal_name}
                    </span>
                </div>
            </div>
            <div className={s.infocontainer}>

                <div className={s.genes}>
                    {animal.animal_gene_traits.slice(0,3).map((gene)=>
                    {
                       
                    return(
                        <div key={animal.animal_id + gene} className={s.gene} >
                        <div  style={animal.animal_gender == "Male" ? {backgroundColor:colors[4]} : {backgroundColor:colors[9]}} className={s.genebubble}>
                            {gene.substring(0,1)}
                        </div>
                        <div className={s.genelabel}>
                        {gene}
                        </div>
                        </div>
                    )})
                        
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
