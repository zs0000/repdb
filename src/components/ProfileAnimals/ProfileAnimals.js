import React, { useEffect, useState } from 'react'
import s from "./ProfileAnimals.module.css"
import { useProfileData } from '@/hooks/useProfileData'
import Loader from '../Loader/Loader'
import AnimalCard from '../AnimalCard/AnimalCard'
import { useProfileAnimals } from '@/hooks/useProfileAnimals'
function ProfileAnimals({id}) {
    const [filteredAnimals, setFilteredAnimals] = useState([])
    const [filtered, setFiltered] = useState(false)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")
    const {data, status} = useProfileAnimals(id)

  

    
    if(status === "loading") return <Loader/>
    if(status === "error") return <>Error fetching animals.</>

    const handleSearch = (e) => {
        setSearch(e.target.value)
        if(e.target.value === ""){
            setFiltered(false)
            return
        }
        setFiltered(true)
        setFilteredAnimals(data.filter(animal => animal.animal_name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    
    const handleFilter = (e) => {
        if(e.target.value === "all"){
            setFiltered(false)
            setFilter(e.target.value)
            setSearch("")
            return
        }
        setFiltered(true)
        setFilter(e.target.value)
        setSearch("")
        setFilteredAnimals(data.filter(animal => animal.animal_type === e.target.value))
    }



  return (
    <div className={s.container}>
        <div className={s.filters}>
        <div className={s.searchcontainer}>
            <input className={s.search} onChange={(e) => handleSearch(e)} value={search} type="text" placeholder="Search" />
        </div>
        <div className={s.filterscontainer}>
            <select onChange={(e) => handleFilter(e)} value={filter} className={s.filter} name="filter" id="filter">
                <option value="all">All</option>
                <option value="Crested Gecko">Crested Gecko</option>
                <option value="Ball Python">Ball Python</option>
            </select>
        </div>
        </div>
        <div className={s.content}>
            {!filtered ? data.map(animal => (
                <AnimalCard key={animal.id} animal={animal}/>
            ))
        :
        filteredAnimals.map(animal => (
            <AnimalCard key={animal.id} animal={animal}/>
        ))
        }

        </div>
    </div>
  )
}

export default ProfileAnimals