import { supabase } from "@/lib/supabaseClient"
import s from "./DashboardAnimalsComponent.module.css"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import AnimalCard from "../AnimalCard/AnimalCard"
import AnimalFormModal from "../AnimalFormModal/AnimalFormModal"
import Modal from 'react-modal';
import { BsCameraFill } from "react-icons/bs"
import EditAnimalForm from "../EditAnimalForm/EditAnimalForm"

export default function DashboardAnimalsComponent({session, animalType}) {
  const [animals, setAnimals] = useState([])
  const [filteredAnimals, setFilteredAnimals] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAnimals = async () => {
    try {
      // select the animals from the supabase database where the animal_owned_by_user_id is equal to the session.user.id
      const { data, error } = await supabase.from("animals").select("*").eq("animal_owned_by_user_id", session.user.id)

      if (error) {
        alert(error.message)
      }
      if(data){
       setAnimals(data)
      }
      return data
    } catch (err) {
      console.error(err.message)
    }
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey:["animals"],
    queryFn: fetchAnimals
  })

  //write a function to filter by animal type
  const handleAnimalFilter = (animalType) => {
    if(animalType == "all"){
      setFilteredAnimals(animals)
      setLoading(false)
    } else {
      const filteredList = animals.filter((animal)=>animal.animal_type === animalType)
      setFilteredAnimals(filteredList)
      setLoading(false)
    }  
  }

  useEffect(() => {
    if (data && animalType){
      handleAnimalFilter(animalType)
    }
  }, [animalType, data])

  if (isLoading) {
    return <></>
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
