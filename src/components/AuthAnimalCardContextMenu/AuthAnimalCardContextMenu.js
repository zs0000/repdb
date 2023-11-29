import React, { useEffect, useState } from 'react'
import s from './AuthAnimalCardContextMenu.module.css'
import Link from 'next/link'
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'
import { supabase } from '@/lib/supabaseClient'
import Dot from '@/icons/dot'
export default function AuthAnimalCardContextMenu({isOpen, setIsOpen, animalCardMenuRef, animal_id, modalIsOpen, setModalIsOpen, actionItems, setActionItems, action, setAction, actionState}) {
   
    const [decided, setDecided] = useState(false)
    
    const handleOpen = async(e) => {
        e.stopPropagation()
        try {
            setIsOpen(true)
        } catch (error) {
            
        }
    }

    const handleOpenModal = async(e) => {
        e.stopPropagation()
        try {
            setIsOpen(false)
      
            setActionItems(animal_id)
            setModalIsOpen(true)
        } catch (error) {
        }
    }

   

    //useEffect to check if escape key is pressed while menu isOpen
    useEffect(() => {
        const handleEscape = (e) => {
            if(e.key === "Escape"){
                setIsOpen(false)
            }
        }
        if(isOpen){
            document.addEventListener("keydown", handleEscape)
        }
        return () => {
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isOpen])

    if(!isOpen){
        return(
            <div className='relative flex justify-items-end w-full'>
                <div className={s.closedcontainer} onClickCapture={(e) => handleOpen(e)}>
                <Dot/>
            </div>
            </div>
        )
    }
    return(
        <div ref={animalCardMenuRef} className={s.container}>
            
            <div className={s.clickarea}>
                <div className={s.menu}>
                   <div className={s.menuitem}>
                   <Link href={`/animals/${animal_id}`} >
                    View page
                    </Link>

                   </div>
                    <div className={s.menuitem}>
                    <Link href={`/animal/pairing/${animal_id}`} >
                    Edit mate(s)
                    </Link>
                    </div>
                    <div className={s.menuitem}>
                    <Link href={`/edit/animal/${animal_id}`} >
                    Edit animal
                    </Link>
                    </div>
                   
                    <div onClickCapture={(e)=>handleOpenModal(e)} className={s.menuitem}>
                        Delete Animal
                    </div>
                </div>
            </div>
        </div>
    )

    
}
