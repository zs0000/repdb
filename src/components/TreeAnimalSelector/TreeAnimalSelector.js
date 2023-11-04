import React, { use, useEffect, useState } from 'react'
import s from "./TreeAnimalSelector.module.css"
import { useUserAnimalData } from '@/hooks/useUserAnimals'
export default function TreeAnimalSelector({session}) { 
    const [animalsList, setAnimalsList] = useState([])
    const [clutchNumber, setClutchNumber] = useState(1)
    const [actionStatus, setActionStatus] = useState('Select Maternal Animal')
    const [maternalAnimal, setMaternalAnimal] = useState(null)
    const [paternalAnimal, setPaternalAnimal] = useState(null)
    const [childrenList, setChildrenList] = useState([])
    const {data, status} = useUserAnimalData(session.user.id) 
      //if data then set animalsList to data
      useEffect(() => {
        if(data) {
          setAnimalsList(data)
        }
      }, [data])


    const handleAction = (animal) => {
        if(actionStatus === 'Select Maternal Animal') {
            setMaternalAnimal(animal)
            const newList = animalsList.filter(item => item !== animal)
            setAnimalsList(newList)
            
            setActionStatus('Select Paternal Animal')
        }
        else if(actionStatus === 'Select Paternal Animal') {
            setPaternalAnimal(animal)
            const newList = animalsList.filter(item => item !== animal)
            setAnimalsList(newList)
            setActionStatus(`Select all Children for Clutch ${clutchNumber}`)
        }
        else if(actionStatus === `Select all Children for Clutch ${clutchNumber}`) {
            setChildrenList([...childrenList, animal])
            const newList = animalsList.filter(item => item !== animal)
            setAnimalsList(newList)

        }
    }
    

    if(status === 'loading') return <div>Loading...</div>
    if(status === 'error') return <div>Error...</div>


    
    const handleAnimalSelect = (name) => {
      if(animalsList.includes(name)) {
        const newList = animalsList.filter(animal => animal !== name)
        setAnimalsList(newList)
      }
      else {
        setAnimalsList([...animalsList, name])
      }

        console.log(animalsList)
    }




  return (
    <div className={s.container}>
        <div className={s.content}>
          <div className={s.statuscontainer}>
            <span className={s.statuslabel}>
              Status:
            </span>
            <span className={s.status}>
              {actionStatus}
            </span>
          </div>
          <div className={s.carousel}>
              <div className={s.items}>
                {animalsList ? animalsList.map((animal) => (
                  <div onClick={()=>handleAction(animal)} key={animal.animal_id} className={animalsList.includes(animal.animal_name) ? s.activeitem : s.item}>
                  {animal.animal_name}
                  </div>
                )) : <></>}
              </div>
          </div>
          <div className={s.selectedanimals}>
            <div className={s.selectedanimal}>
              <span className={s.selectedanimallabel}>
                Maternal Animal:
              </span>
              <span className={s.selectedanimalname}>
                {maternalAnimal ? maternalAnimal.animal_name : 'None'}
              </span>
            </div>
            <div className={s.selectedanimal}>
              <span className={s.selectedanimallabel}>
                Paternal Animal:
              </span>
              <span className={s.selectedanimalname}>
                {paternalAnimal ? paternalAnimal.animal_name : 'None'}
              </span>
            </div>
            <div className={s.selectedanimal}>
              <span className={s.selectedanimallabel}>
                Children:
              </span>
              <span className={s.selectedanimalname}>
                {childrenList.length > 0 ? childrenList.map((animal) => animal.animal_name).join(', ') : 'None'}
              </span>
            </div>
          </div>
        </div>
    </div>
  )
}
