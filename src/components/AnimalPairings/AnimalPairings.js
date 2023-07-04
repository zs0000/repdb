import React from 'react'
import s from './AnimalPairings.module.css'
import Loader from '../Loader/Loader'
import { useAnimalPairingsData } from '@/hooks/useAnimalPairingsData'
import AnimalCard from '../AnimalCard/AnimalCard'
import AnimalPairingsCard from '../AnimalPairingsCard/AnimalPairingsCard'
import AnimalPairingsCard2 from '../AnimalPairingsCard2/AnimalPairingsCard2'

export default function AnimalPairings({animal}) {
    const {data, status} = useAnimalPairingsData(animal)
   
    if(status === "loading"){
        return <Loader />
    }
    if(status === "error"){
        return <p>Error</p>
    }
    if(data.length === 0){
        return <p>No pairings</p>
    }
    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.content}>
           <div className={s.titlecontainer}>
                <h1 className={s.title}>{`${animal.animal_name}` + "'s pairings:"}</h1>
            </div>
            <div className={s.pairingscontainer}>
                {data.map((pairing) => (
                   <div className={s.pairingscardcontainer} key={pairing.animal_id}>
                     <AnimalPairingsCard2 animal={pairing.animals} />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
