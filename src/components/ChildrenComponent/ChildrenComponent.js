import React, { useState } from 'react'
import s from './ChildrenComponent.module.css'
import { usePairingsChildren } from '@/hooks/usePairingChildren'
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'
import { supabase } from '@/lib/supabaseClient'
import GenerationComponent from '../GenerationComponent/GenerationComponent'
export default function ChildrenComponent({id, animals}) {

    const {data, status} = usePairingsChildren({id})

     function grabGenerationsAnimals(generation){
        console.log(generation)
        const generationAnimals = []
        generation.forEach((animal) => {
            generationAnimals.push(animals.find((item) => item.animal_id === animal))
        })
        return generationAnimals
    }
   
  

    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.content}>
            {data.length ===0 ? 
                <NoChildren id={id} animals={animals} />
     : data.map((generation, generationIDX) => (
                <div key={generationIDX}  className={s.generations}>
                    <GenerationComponent generationIDX={generationIDX} generation={grabGenerationsAnimals(generation)} />
                </div>
                )) }
        </div>
    </div>
  )
}


const NoChildren = ({animals, id}) => {
    console.log(animals)
    const [selectedAnimals, setSelectedAnimals] = useState([])
    const [generation, setGeneration] = useState(1)
    const [filteredAnimals, setFilteredAnimals] = useState(animals)
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState([])


  
    const handleSearch = (e) => {
        const searchValue = e.target.value
        setSearchValue(searchValue)
        const filteredAnimals = animals.filter((animal) => {
            return animal.animal_name.toLowerCase().includes(searchValue.toLowerCase())
        })
        setFilteredAnimals(filteredAnimals)
    }

    const handleSelectChild = (animal) => {
        if(selectedAnimals.includes(animal)){
            setSelectedAnimals(selectedAnimals.filter((item) => item !== animal))
        } else
        setSelectedAnimals([...selectedAnimals, animal])
    }

    const handleAddOffspring = async() => {
       try {
  
        console.log(selectedAnimals)
        const insertObj = [
            ...selectedAnimals.map((animal) => ({
                pairing_id: id,
                animal_id: animal.animal_id,
                generation: generation
            }))
        ]
        const {error} = await supabase
        .from('offspring')
        .insert(insertObj)
        console.log(error)
        alert('sent')
       } catch (err) {
              console.log(err.message)
       }
    }
    return(
        <div className={s.nochildcontainer}>
            <div>
                <h3>Select offspring for Clutch/Generation #{generation}</h3>
           
            </div>
            <div className={s.buttoncontainer}>
            <button disabled={selectedAnimals.length === 0  ? true : false} onClick={handleAddOffspring}>
                add
            </button>
        </div>
        <div className={s.searchcontainer}>
        <input placeholder="search" type="text" onChange={(e)=> handleSearch(e)} />
        </div>
        <div className={s.animals}>
            {filteredAnimals ? filteredAnimals.map((animal) => (
            <div onClick={()=>handleSelectChild(animal)} className={selectedAnimals.includes(animal) ? s.selectedanimal : s.animal} key={animal.animal_id}>
                <BasicAnimalCard animal={animal} />
            </div>
            )) : <div>No animals</div>    
            }
        </div>
        
        </div>
        
    )
}