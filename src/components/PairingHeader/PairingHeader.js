import React, {  useMemo } from 'react'
import s from "./PairingHeader.module.css"
import { usePairingAnimalIds } from '@/hooks/usePairingIds'
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'

export default function PairingHeader({id, animals}) {



    
    const {data, status} = usePairingAnimalIds(id)
    const { mother, father } = useMemo(() => {
        if (!data || data.length === 0) {
            return { mother: null, father: null };
        }
        
        const dad = animals.find(animal => animal.animal_id === data[0].male_id);
        const mom = animals.find(animal => animal.animal_id === data[0].female_id);
        
        return { mother: mom, father: dad };
    }, [data, animals]);

    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
    console.log(data)




  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.titlecontainer}>
                <h1 className={s.title}>Pairing</h1>
            </div>
            <div className={s.items}>
            <div className={s.item}>
            <BasicAnimalCard animal={father} />
            </div>
                <div className={s.item}>
                <BasicAnimalCard animal={mother} />
                </div>
            </div>

        </div>
    </div>
  )
}
