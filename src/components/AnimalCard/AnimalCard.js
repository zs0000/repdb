import s from "./AnimalCard.module.css"
import Image from "next/image"
import { useState } from "react";
import EditAnimalForm from "../EditAnimalForm/EditAnimalForm";

export default function AnimalCard({animal,session}) {

  const [animalName, setAnimalName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [animalGender, setAnimalGender] = useState('unknown');
  const [imageUrl, setImageUrl] = useState(null);
  const [testState, setTestState] = useState(false);
  const [modalKey, setModalKey] = useState(0);  // new state
  
  const current = new Date();

  const handleAnimalSelect = (animal) => {
    
  }

  if(!animal){
    return <></>
  }
  return (
    <div  className={s.container}  onClick={() => {
      setTestState(true);
      setModalKey(prevKey => prevKey + 1);  // update key on each click
    }} >
      <EditAnimalForm key={modalKey} animal={animal}  testState={testState} setTestState={setTestState} />
        <div className={s.imagecontainer}>
           
            <Image loading="lazy" src={animal.animal_photo_url} alt="Picture of the animal"
  width={200} height={200}

 className={s.photo}  />

          
        </div>
        <div className={s.infocontainer}>
            <div className={s.titlecontainer}>
              <span className={s.label}>
                <span className={s.name}>
                    {animal.animal_name}
                </span>
                <span className={s.gender}>
                    {" " + animal.animal_gender}
                </span>
              </span>
            </div>
            <div className={s.pairingconatiner  }>
                1,2,3,4,5
            </div>
        </div>
        
    </div>
  )
}
