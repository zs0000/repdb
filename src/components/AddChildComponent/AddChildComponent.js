import React, { useEffect } from 'react'
import s from "./AddChildComponent.module.css"
import { useUserAnimalData } from '@/hooks/useUserAnimals'
import PairingHeader from '../PairingHeader/PairingHeader'
import ChildrenComponent from '../ChildrenComponent/ChildrenComponent'

export default function AddChildComponent({session, id}) {
   
    const {data, status} = useUserAnimalData(session?.user?.id)

    useEffect(() => {
        if (!session?.user?.id) {
            router.push("/login");
        }
    }, [session]);
    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
    if(data.session === null){
        router.push("/login")
        return <div>Redirecting...</div>
    }


  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.header}>
                <PairingHeader id={id} animals={data} />
            </div>
            <div className={s.toolbar}>
                {/* Tool bar*/}
            </div>
            <div className={s.childrencontainer}>
                <ChildrenComponent id={id} animals={data} />
            </div>
        </div>
    </div>
  )
}


const Toolbar = () => {
    return(
        <div className={s.toolbarcontainer}>
            <button>
                add
            </button>
        </div>
    )
}