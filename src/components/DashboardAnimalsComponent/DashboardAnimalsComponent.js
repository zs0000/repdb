import { supabase } from "@/lib/supabaseClient"
import s from "./DashboardAnimalsComponent.module.css"
import { useCallback, useContext, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import AnimalCard from "../AnimalCard/AnimalCard"
import AnimalFormModal from "../AnimalFormModal/AnimalFormModal"
import Modal from 'react-modal';
import { BsCameraFill } from "react-icons/bs"
import EditAnimalForm from "../EditAnimalForm/EditAnimalForm"
import { SessionContext } from "@/context/SessionContext"
import Loader from "../Loader/Loader"
import { useUserAnimalData } from "@/hooks/useUserAnimals"

export default function DashboardAnimalsComponent({session, animalType}) {
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [animalsSet, setAnimalsSet] = useState(false)
  const [loading, setLoading] = useState(true)
  const {data, status} = useUserAnimalData(session.user.id)

 
  //write a function to filter by animal type
  const handleAnimalFilter = useCallback((animalType) => {
    if(data){
      if(animalType == "all"){
        setFilteredAnimals(data)
        setLoading(false)
        
      } else {
        const filteredList = data.filter((animal)=>animal.animal_type === animalType)
        setFilteredAnimals(filteredList)
        setLoading(false)
      }  
    }
  }, [data]) // Here you need to define the dependencies of `handleAnimalFilter`. If it uses other state or props in its definition, include them here. I've included `animals` as an example.
  
  useEffect(() => {
    if (animalType){
      handleAnimalFilter(animalType)
    }
  }, [animalType, handleAnimalFilter]) // Now `handleAnimalFilter` is memoized and won't cause your effect to run excessively.
  

  if(status === "loading"){
    return <Loader/>
  }
  if(status === "error"){
    return <div>error</div>
  }

  
  console.log(data)
  return (
    <div className={s.container}>
      <div className={s.content}>
        {!loading ? filteredAnimals.map((animal) => (
          <AnimalCard onClick={()=>{
            setTestState(true)
            
          }} key={animal.animal_id} animal={animal} session={session}/>
        )): <></>}
      </div>
    </div>
  )
}
