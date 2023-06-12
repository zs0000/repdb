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

export default function DashboardAnimalsComponent({session}) {
  console.log(session)
  const [animals, setAnimals] = useState([])

  
  const { data, isLoading, isError, error } = useQuery({
    queryKey:["animals"],
    queryFn: () => 
      fetchAnimals()
  })
  const fetchAnimals = async () => {
  try {

    // select the animals from the supabase database where the animal_owned_by_user_id is equal to the session.user.id
    const { data, error } = await supabase.from("animals").select("*").eq("animal_owned_by_user_id", session.user.id)
    console.log(data)
    if (error) {
      alert(error.message)
      console.log(error.message)
    }
    if(data){
     setAnimals(data)
      
    }
  } catch (err) {
    console.error(err.message)
  }
  console.log(animals)
  return animals
  }

 

  if (isLoading) {
    return 
    <>

    </>
  }
  if (isError) {
    return <div>{error.message}</div>
  }
  return (
    <div className={s.container}>
     
      <div className={s.content}>
        {animals.length > 0  ? animals.map((animal)=>(
          <AnimalCard onClick={()=>{
            setTestState(true)
            
            handleAnimalSelect()
          }} key={animal.animal_id} animal={animal} session={session}/>
        )) : <>no</>}
      </div>
      
    </div>
  )
}
