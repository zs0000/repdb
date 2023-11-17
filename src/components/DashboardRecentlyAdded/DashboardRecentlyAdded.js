import React from 'react'
import s from "./DashboardRecentlyAdded.module.css"
import { useUserRecentlyAdded } from '@/hooks/useUserRecentlyAdded'
import Image from 'next/image'
import AnimalCard from '../AnimalCard/AnimalCard'
function DashboardRecentlyAdded({session}) {
    const {data, status} = useUserRecentlyAdded(session.user.id)
    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'error') {
        return <div>Error</div>
    }


    const handleSelectAnimal = (animal_id) => {
        //check if the animal is already selected
        if(selectedAnimals.includes(animal_id)){
          //if it is, remove it from the array
          setSelectedAnimals(selectedAnimals.filter(animal => animal !== animal_id));
          
        } else {
          //if it isn't, add it to the array
      
          setSelectedAnimals([...selectedAnimals, animal_id]);
         
        }
        console.log(selectedAnimals)
      }
    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.titlecontainer}>
            <span className={s.title}>
                Recently Added
            </span>
        </div>
        <div className={s.content}>
            <div className={s.items}>
                {data.slice(0,3).map((animal) => (
                     <AnimalCard 
                     handleSelectAnimal={handleSelectAnimal}
                     
                     
                     key={animal.animal_id} 
                     animal={animal} 
                     session={session}
                   />
                ))}
            </div>
        </div>
    </div>
  )
}

export default DashboardRecentlyAdded