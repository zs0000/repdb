import React, { useEffect, useRef, useState } from 'react'
import s from "./PairingCard.module.css"
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'
import Link from 'next/link'
import PairingCardContextMenu from '../PairingCardContextMenu/PairingCardContextMenu'
import Image from 'next/image'

{/*
export default function PairingCard(pairing) {
    console.log(pairing)
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.names}>
                <span className={s.name}>
                    {pairing.animal[0].animal_name}
                </span>
                <span className={s.name}>
                    {pairing.animal[1].animal_name}
                </span>
            </div>
            <div className={s.genes}>
                {pairing.animal[0].animal_gene_traits.map((gene) => (
                <div key={pairing.animal[0].animal_name + gene} className={s.item}>
                    <span className={s.gene}>
                        {gene}
                    </span>
                </div>
                ))    
                }
            </div>
        </div>
    </div>
  )
}

*/}


export default function PairingCard({animal, pair_id}) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0})
    const [menuPairId, setMenuPairId] = useState(null)
    
    const menuRef = useRef(null)

    const handleClickOutsideOfMenu = (e) => {
        if(menuRef.current && !menuRef.current.contains(e.target)){
            setMenuOpen(false)
        }
    }

    useEffect(() => {
        if(menuOpen){
            //add event listener if menu open
            document.addEventListener("mousedown", handleClickOutsideOfMenu)
        }
        return () => {
            // clean up the event listener
            document.removeEventListener("mousedown", handleClickOutsideOfMenu)
        }
    }
    ,[menuOpen])

  return (
    <div className={s.container}>
        
        <div  className={s.content}>
            <div className={s.items}>
            <div className={s.item}>
                <div className={s.photocontainer}>
                    <Image className={s.photo} src={animal[0].photos[0].img_url} alt="animal photo" fill style={{objectFit:'cover'}}/>
                </div> 
            </div>
            <div className={s.photocontainer}>
                    <Image src={animal[1].photos[0].img_url} alt="animal photo" fill style={{objectFit:'cover'}}/>
                </div> 
            
            </div>
            <div className={s.names}>
            <span className={s.name}>
                {animal[0].animal_name}
            </span>
            <span>
                &
            </span>
            <span className={s.name}>
                {animal[1].animal_name}
            </span>
            </div>
        </div>
        <PairingCardContextMenu menuRef={menuRef} menuOpen={menuOpen} setMenuOpen={setMenuOpen}  pair_id={pair_id}/>
    </div>
  )
}
