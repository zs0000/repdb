import React from 'react'
import s from "./PairingCard.module.css"
import BasicAnimalCard from '../BasicAnimalCard/BasicAnimalCard'
import Link from 'next/link'
import PairingCardContextMenu from '../PairingCardContextMenu/PairingCardContextMenu'

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


  return (
    <div className={s.container}>
        <PairingCardContextMenu   pair_id={pair_id}/>
        <div  className={s.content}>
            <div className={s.item}>
            <BasicAnimalCard animal={animal[0]}/>
            </div>
            <div className={s.item}>
            <BasicAnimalCard animal={animal[1]}/>
            </div>
            
        </div>
    </div>
  )
}
