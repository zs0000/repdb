import { useAnimalData } from '@/hooks/useAnimalData';
import s from './AnimalProfile.module.css';
import Image from 'next/image';
import { BsGenderFemale, BsQuestionCircle } from 'react-icons/bs';
import AnimalPairings from '../AnimalPairings/AnimalPairings';
import AnimalOwnerCard from '../AnimalOwnerCard/AnimalOwnerCard';
import Link from 'next/link';
import AnimalFavoritesComponent from '../AnimalFavoritesComponent/AnimalFavoritesComponent';
import Head from 'next/head';

export default function AnimalProfile({id}) {
  const { data, status } = useAnimalData(id);
  console.log(data);
  if (status === 'loading') return <div className='w-full h-full flex flex-col items-center justify-center min-h-screen'>Loading...</div>;
  if (status === 'error') return <div>Error fetching animal data</div>;

    return (
    <div className={s.container}>
      
      <div className={s.content}>
        <div className={s.directorycontainer}>
          <div className={s.directory}>
            <span>
                <Link href="/animals">
                  {"Animals > "} 
                </Link>
                <Link href="/search?q=type=Crested+Gecko&term=&gene=">
                   {` ${data[0].animal_type}s > `}
                </Link>
                <Link href={`/animals/${data[0].id}`}>
                  {` ${data[0].animal_name}`}
                </Link> 
            </span>          
          </div>
        </div>
        <div className={s.topcontainer}>
        <div className={s.photocontainer}>
        <Image src={data[0].photos[0].img_url} alt={data[0].animal_type} className={s.photo} fill />
        </div>
        <div className={s.panelcontainer}>
          <div className={s.panel}>
            <div className={s.paneltitle}>
              <h1 className={s.name}>{data[0].animal_name}</h1>
              <div>
                {data[0].animal_gender == "Female" ? <BsGenderFemale className='text-pink-400'/> : data[0].animal_gender == "Male" ? <BsGenderFemale className='text-blue-400'/> : <BsQuestionCircle className='text-gray-400'/>}
              </div>
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
          <div className={s.ownercardcontainer}>
          <AnimalOwnerCard id={data[0].animal_owned_by_user_id}/>
        </div>
        </div>
        
        </div>
        
        <div className={s.bottomcontainer}>
            {data ? <AnimalPairings animal={data[0]}/> : null}
        </div>
      </div>
    </div>
  )
}
