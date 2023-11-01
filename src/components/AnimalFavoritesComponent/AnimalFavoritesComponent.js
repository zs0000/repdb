import React from 'react'
import s from "./AnimalFavoritesComponent.module.css"
import { useAnimalFavorites } from '@/hooks/useAnimalFavorites'

function AnimalFavoritesComponent({animal_id}) {

    console.log(animal_id)

    const {data, status} = useAnimalFavorites(animal_id)

    if(status === 'loading'){
        return <div>Loading...</div>
    }   
    if(status === 'error'){
        return <div>Error</div>
    }

    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.likescontainer}>
            <span className={s.label}>
                {"Favorites: "}
            <span className={s.likes}>
                {data}
            </span>
            </span>
            
            </div>
        </div> 
    </div>
  )
}

export default AnimalFavoritesComponent