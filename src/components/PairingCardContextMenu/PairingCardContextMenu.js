import React, { useState } from 'react'
import s from './PairingCardContextMenu.module.css'
import Link from 'next/link'
export default function PairingCardContextMenu({menuOpen, setMenuOpen, pair_id, menuRef}) {
    const handleOpen = (e) => {
        e.preventDefault()
        
        setMenuOpen(true)
    }
    const handleClose = (e) => {
        e.preventDefault()
        setMenuOpen(false)
    }

    if(!menuOpen){
        return(
            <div className={s.closedcontainer} onClick={(e) => handleOpen(e)}>
               
            </div>
        )
    }
    return(
        <div ref={menuRef} className={s.container}>
            <div className={s.clickarea}>
                <div className={s.menu}>
                   <div className={s.menuitem}>
                   <Link href={`/tree/${pair_id}`} >
                    View Tree
                    </Link>

                   </div>
                    <div className={s.menuitem}>
                    <Link href={`/pairings/${pair_id}`} >
                    View Pairing
                    </Link>
                    </div>
                    <div className={s.menuitem}>
                    <Link href={`/add/child/${pair_id}`} >
                    View Tree
                    </Link>
                    </div>
                    <div className={s.menuitem}>
                        Delete Pairing
                    </div>
                </div>
            </div>
        </div>
    )

    
}
