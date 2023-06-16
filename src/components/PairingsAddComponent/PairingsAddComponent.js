import React, { useEffect, useState } from 'react'
import s from "./PairingsAddComponent.module.css"
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'
export default function PairingsAddComponent() {
    const [search, setSearch] = useState("")
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
         setLoading(false)
        }
        return data
      } catch (err) {
        console.error(err.message)
      }
      setLoading(false)
    }
  
    const { data, isLoading, isError, error } = useQuery({
      queryKey:["animals"],
      queryFn: fetchAnimals
    })

    const filterAnimals = (animals) => {
        return animals.filter((animal) => {
            return animal.name.toLowerCase().includes(search.toLowerCase())
        })
    }
  
    if (loading) {
        return <>hi</>
    }
   
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.topcontainer}>
               
            </div>
            <div className={s.inputcontainer}>

                
                <input className={s.input}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Search for an animal"/>
            </div>
        </div>
    </div>
  )
}
