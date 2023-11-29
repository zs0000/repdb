import React from 'react'
import s from './ConfirmDeleteModal.module.css'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
export default function ConfirmDeleteModal({modalIsOpen, setModalIsOpen, action, actionItems, modalRef}) {
    const router=useRouter()
    
    if(!modalIsOpen){
        return <></>
}


    const handleConfirm = async(e) => {
        e.preventDefault()
        try {
        
            const {data,error} = await supabase
                .from('animals')
                .update({marked_for_deletion: true})
                .eq('animal_id', actionItems)
                .select()
                

            if(data){
                alert('Animal removed')
                router.push('/animals')
            }

            if(error){
                alert('There was an error deleting this animal. Please try again.')
                throw error
            }
        

            setModalIsOpen(false)
        } catch (error) {
            
        }
    }

    return (
        <div ref={modalRef} className={s.container}>
            <div className={s.clickarea}>
                <div className={s.modal}>
                    <div className={s.modalheader}>
                        <h3 className={s.modaltitle}>Delete {actionItems}</h3>
                        <button onClick={() => setModalIsOpen(false)} className={s.closebutton}>X</button>
                    </div>
                    <div className={s.modalbody}>
                        <p>Are you sure you want to delete {actionItems}?</p>
                    </div>
                    <div className={s.modalfooter}>
                        <button onClick={() => setModalIsOpen(false)} className={s.cancelbutton}>Cancel</button>
                        <button onClick={(e) => handleConfirm(e)} className={s.deletebutton}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }