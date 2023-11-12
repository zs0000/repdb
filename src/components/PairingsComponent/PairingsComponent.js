import React from 'react'
import s from "./PairingsComponent.module.css"
import { useUserAnimalPairings } from '@/hooks/useUserAnimalPairings'
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'
import PairingCard from '../PairingCard/PairingCard'
export default function PairingsComponent({session, id}) {

  const {data, status} = useUserAnimalPairings(session.user.id)
    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
    if(data.session === null){
        router.push("/login")
        return <div>Redirecting...</div>
    }
    console.log(data)

    return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.titlecontainer}>
                <h1 className={s.title}>Pairings</h1>
            </div>
            <div className={s.items}>
                {data[1].map((pairing) => (
                    <div className={s.item} key={pairing.pair_id}>

                                    <PairingCard pair_id={pairing.pair_id} animal={[data[0].filter((animal) => animal.animal_id === pairing.male_id)[0], data[0].filter((animal) => animal.animal_id === pairing.female_id)[0]]}/>    
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
