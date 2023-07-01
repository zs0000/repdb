import { useAnimalData } from '@/hooks/useAnimalData';
import s from './AnimalProfile.module.css';
import Image from 'next/image';
import { BsGenderFemale, BsQuestionCircle } from 'react-icons/bs';

export default function AnimalProfile({id}) {
  const { data, status } = useAnimalData(id);
  console.log(data);
  if (status === 'loading') return <div className='w-full h-full flex flex-col items-center justify-center min-h-screen'>Loading...</div>;
  if (status === 'error') return <div>Error fetching animal data</div>;

    return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.topcontainer}>
        <div className={s.photocontainer}>
        <Image src={data[0].photos[0].img_url} alt={data[0].animal_type} width={500} height={500} />
        </div>
        <div className={s.panelcontainer}>
          <div className={s.panel}>
            <div className={s.paneltitle}>
              <h1 className={s.name}>{data[0].animal_name}</h1>
              <div>
                {data[0].animal_gender == "Female" ? <BsGenderFemale className='text-pink-400'/> : data[0].animal_gender == "Male" ? <BsGenderFemale className='text-blue-400'/> : <BsQuestionCircle className='text-gray-400'/>}
              </div>
              </div>
              <div className={s.panelanimal}>
                <h2 className={s.animal}>{data[0].animal_type}</h2>
                </div>
                <div className={s.panelgenes}>
                  {/*Mapped out traits of animal's genes. */}
                  {data[0].animal_gene_traits.map((gene) => (
                    <div className={s.gene} key={gene.id}>
                      <h3>{gene}</h3>
                      </div>
                  ))}
                </div>
          </div>
        </div>
        
        </div>
        <div className={s.bottomcontainer}>

        </div>
      </div>
    </div>
  )
}
