import { useAnimalData } from '@/hooks/useAnimalData';
import s from './AnimalEditComponent.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function AnimalEditComponent({session, id}) {
  const [editName, setEditName] = useState(false)
  const [name, setName] = useState("")

  const {data, status} = useAnimalData(id)

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  if (status === 'error') {
    return <div>Error</div>
  }
  if (data.length === 0) {

    return <div>No data</div>
  }
  console.log(data)
  return (
    <div className={s.container}>
      <div className={s.topcontainer}>
          <div className={s.photocontainer}>
            <Image alt="reptile photo" src={data[0].photos[0].img_url} fill style={{objectFit:"cover", objectPosition:'center'}} />
          </div>
          <div className={s.infocontainer}>
            <div className={s.namecontainer}>
              {editName ?  
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              :
              <span className={s.name}>
                {data[0].animal_name}
              </span>  
            }
            </div>
            <div className={s.genescontainer}>
              <div className={s.searchcontainer}>
                <input type="text" placeholder="Search for genes" />
              </div>
              <div className={s.genes}>

              </div>
            </div>

          </div>
      </div>
      <div className={s.bottomcontainer}>
            {/* Mates component. Create hook to fetch current and  valid mates.*/}
      </div>
    </div>
  )
}
