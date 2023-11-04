import s from './BasicAnimalCard.module.css'  

export default function BasicAnimalCard  ({animal}) {

    return(
                <div className={s.item}>
                    <div className={s.infocontainer}>
                    <div className={s.animaltypecontainer}>
                        <span className={s.animaltype}>
                                {animal.animal_type}
                        </span>
                    </div>
                        <div className={s.labelcontainer}>
                            <span className={s.label}>
                                {animal.animal_name}
                            </span>
                            <span>
                                {/*gender svg*/}
                            </span>
                        </div>
                        <div className={s.geneticscontainer}>
                            <div className={s.traits}>
                                {animal.animal_gene_traits.map((trait) => (
                                    <div key={animal.animal_name + trait} className={s.trait}>
                                        {trait}
                                    </div>
                                    ))}
                            </div>
                        </div> 
                    </div>
                    {/* 
                    <div className={s.imagecontainer}>
                        <Image/>
                    </div>
                    */}
                </div>
    )
}