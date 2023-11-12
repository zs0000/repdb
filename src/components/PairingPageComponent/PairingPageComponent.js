import { usePairingData } from '@/hooks/usePairingData'
import React, { useState } from 'react'
import s from './PairingPageComponent.module.css'
import PairingPageCard from '../PairingPageCard/PairingPageCard'
import PairingPageOffspring from '../PairingPageOffspring/PairingPageOffspring'
import PairingPageModal from '../PairingPageModal/PairingPageModal'
export default function PairingPageComponent({pairing, id}) {

    const {data, status} = usePairingData(id)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
  
    const handleImageClick = (imageSrc) => {
      setCurrentImage(imageSrc);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
 
    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.labelcontainer}>
                <span className={s.label}>
                    Parents
                </span>
            </div>
            <div className={s.topcontainer}>
            <div className={s.item}>
                <PairingPageCard onImageClick={handleImageClick} animal={data.female}/>
            </div>
            <div className={s.item}>
                <PairingPageCard onImageClick={handleImageClick} animal={data.male}/>
            </div>
            </div>
            <div className={s.middlecontainer}>
                 <PairingPageOffspring onImageClick={handleImageClick} kids={data.kids} />
            </div>
        </div>
        <PairingPageModal showModal={isModalOpen} imageSrc={currentImage} onClose={closeModal} />
    </div>
  )
}
