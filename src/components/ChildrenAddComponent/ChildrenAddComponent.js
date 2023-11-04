import React from 'react'
import s from "./ChildrenAddComponent.module.css"
import { useUserAnimalData } from '@/hooks/useUserAnimals'
export default function ChildrenAddComponent(session) {
  
    const {data, status} = useUserAnimalData(session.user.id)

    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
    if(data.session === null){
        router.push("/login")
        return <div>Redirecting...</div>
    }

  
    return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.items}>
            {data.map((animal)=>(
                <div key={animal.animal_id} className={s.item}>
                    
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}
