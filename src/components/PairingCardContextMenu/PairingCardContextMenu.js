import React, { useState } from 'react'
import s from './PairingCardContextMenu.module.css'
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
                    View Tree
                    </div>
                    <div className={s.menuitem}>
                        View Pairing
                    </div>
                    <div className={s.menuitem}>
                        Add Children
                    </div>
                    <div className={s.menuitem}>
                        Delete Pairing
                    </div>
                </div>
            </div>
        </div>
    )

    
}
