import Link from 'next/link'
import React from 'react'
import s from './AnimalPairingsCard.module.css'
import Image from 'next/image'
export default function AnimalPairingsCard({animal}) {
  return (
    <Link href={`/animal/${animal.animal_id}`} className={s.container}>
    <div className={s.content}>
        <div className={s.photocontainer}>
            <Image className={s.photo} src={animal.photos[0].img_url} alt={animal.animal_type} width={200} height={150} />
        </div>
        <div className={s.panelcontainer}>
            <div className={s.panel}>
                <div className={s.paneltitle}>
                    <h1 className={s.name}>{animal.animal_name}</h1>
                </div>
                <div className={s.panelgenes}>
                    {/*Mapped out traits of animal's genes. */}
                    {animal.animal_gene_traits.map((gene) => (
                        <div className={s.gene} key={gene.id}>
                            <h3>{gene}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
</Link>
  )
}
