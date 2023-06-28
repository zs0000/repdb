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

export default function DashboardAnimalsComponent({ animalType}) {
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const session = useContext(SessionContext);
  
  const fetchAnimals = async () => {
    try {
      if(session === null || session === undefined){
        return
      }
      // select the animals from the supabase database where the animal_owned_by_user_id is equal to the session.user.id
      const { data, error } = await supabase
  .from('animals')
  .select(`
    *,
    photos (
      img_url
    )
  `)
  .eq('animal_owned_by_user_id', session.user.id);

      if (error) {
        alert(error.message)
      }
      if(data){
      console.log(data)
       setAnimals(data)
      }
      return animals
    } catch (err) {
      console.error(err.message)
    }

    return animals
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey:["animals"],
    queryFn: fetchAnimals,
  })

  //write a function to filter by animal type
  const handleAnimalFilter = useCallback((animalType) => {
    if(animalType == "all"){
      setFilteredAnimals(animals)
      setLoading(false)
    } else {
      const filteredList = animals.filter((animal)=>animal.animal_type === animalType)
      setFilteredAnimals(filteredList)
      setLoading(false)
    }  
  }, [animals]) // Here you need to define the dependencies of `handleAnimalFilter`. If it uses other state or props in its definition, include them here. I've included `animals` as an example.
  
  useEffect(() => {
    if (animalType){
      handleAnimalFilter(animalType)
    }
  }, [animalType, handleAnimalFilter]) // Now `handleAnimalFilter` is memoized and won't cause your effect to run excessively.
  

  if (isLoading) {
    return <Loader/>
  }
  if (isError) {
    return <div>{error.message}</div>
  }
  
  return (
    <div className={s.container}>
      <div className={s.content}>
        {!loading ? filteredAnimals.map((animal) => (
          <AnimalCard onClick={()=>{
            setTestState(true)
            
          }} key={animal.animal_id} animal={animal} session={session}/>
        )) : <>no</>}
      </div>
    </div>
  )
}
