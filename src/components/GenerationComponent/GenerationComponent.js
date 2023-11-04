import React, { use, useEffect } from 'react'
import s from "./GenerationComponent.module.css"
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'

export default function GenerationComponent({generation, generationIDX}) {



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
      

      const color = colors[generationIDX % colors.length];


  return (
    <div className={s.container}>
        <div className={s.labelcontainer}>
            <span className={s.label} style={{color:color}}>
               Generation {generationIDX}
            </span>
        </div>
        <div className={s.content}>
            { generation?.length > 0 ?
            generation.map((animal) => 
            {
               
            
            return(
                <div className={s.item} key={animal.animal_id}>
                    <BasicAnimalCard animal={animal} />
                </div>
                )})
            :<></>}
        </div>
    </div>
  )
}
