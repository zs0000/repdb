import s from "./AnimalCard.module.css"
import Image from "next/image"
import { useEffect, useState } from "react";
import EditAnimalForm from "../EditAnimalForm/EditAnimalForm";
import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function AnimalCard({animal,session}) {

  const [animalName, setAnimalName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [animalGender, setAnimalGender] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [testState, setTestState] = useState(false);
  const [modalKey, setModalKey] = useState(0);  // new state
  
  const [animalPairings, setAnimalPairings] = useState([]);
  const [animaloffspring, setAnimalOffspring] = useState([]);
  const [animalRelationships, setAnimalRelationships] = useState([]); // [pairings, offspring
  const current = new Date();

 
  return (
    <Link href={`/animals/${animal.animal_id}`}  className={s.container} >
     
        <div className={s.imagecontainer}>
 
            <Image priority src={animal.photos[0] ? animal.photos[0].img_url : ""} alt="Picture of the animal"
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
                {animal.animal_gender == "Male" 
                ? <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 512 511.01"
                className="w-4 h-4 text-sky-500 bg-sky-100 rounded-full p-[2px]"
              >
                <path
                  fillRule="nonzero"
                  d="M456.72 96.62l-115.49 115.5c22.46 31.03 35.72 69.17 35.72 110.41 0 52.04-21.1 99.17-55.2 133.27-34.11 34.1-81.23 55.21-133.28 55.21-52.03 0-99.17-21.11-133.27-55.21C21.1 421.7 0 374.57 0 322.53c0-52.04 21.1-99.17 55.2-133.27 34.1-34.1 81.23-55.21 133.27-55.21 42.91 0 82.47 14.35 114.16 38.5L419.89 55.28h-62.84V0H512v158.91h-55.28V96.62zM282.66 228.35c-24.1-24.1-57.41-39.02-94.19-39.02s-70.08 14.92-94.18 39.02c-24.1 24.1-39.01 57.4-39.01 94.18 0 36.78 14.91 70.09 39.01 94.19 24.1 24.1 57.4 39.01 94.18 39.01 36.78 0 70.09-14.91 94.19-39.01 24.1-24.1 39.01-57.41 39.01-94.19s-14.91-70.08-39.01-94.18z"
                ></path>
              </svg>
                : animal.animal_gender == "Female" 
                ? <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 361 511.42"
                className="w-4 h-4 text-pink-500 bg-pink-100 rounded-full p-[2px]"
              >
                <path
                  fillRule="nonzero"
                  d="M203.64 359.53v44.17h78.58v52.94h-78.58v54.78H150.7v-54.78H72.13V403.7h78.57v-45.15c-37.91-6.3-71.82-24.41-97.83-50.42C20.21 275.47 0 230.35 0 180.5c0-49.84 20.21-94.97 52.87-127.63S130.65 0 180.5 0c49.84 0 94.97 20.21 127.63 52.87S361 130.66 361 180.5c0 49.84-20.21 94.97-52.87 127.63-27.52 27.52-63.9 46.2-104.49 51.4zM270.7 90.3c-23.08-23.08-54.98-37.36-90.2-37.36-35.23 0-67.12 14.28-90.2 37.36s-37.36 54.98-37.36 90.2c0 35.23 14.28 67.12 37.36 90.2s54.97 37.36 90.2 37.36c35.22 0 67.12-14.28 90.2-37.36s37.36-54.97 37.36-90.2c0-35.22-14.28-67.12-37.36-90.2z"
                ></path>
              </svg>
                : <svg
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 512 512"
                className="w-4 h-4 text-gray-300 bg-gray-300 rounded-full p-[2px]"
              >
                <path
                  fillRule="nonzero"
                  d="M256 0c70.69 0 134.7 28.66 181.02 74.98C483.34 121.31 512 185.31 512 256c0 70.69-28.66 134.7-74.98 181.02C390.7 483.34 326.69 512 256 512c-70.69 0-134.69-28.66-181.02-74.98C28.66 390.7 0 326.69 0 256c0-70.69 28.66-134.69 74.98-181.02C121.31 28.66 185.31 0 256 0zm-21.49 301.51v-2.03c.16-13.46 1.48-24.12 4.07-32.05 2.54-7.92 6.19-14.37 10.97-19.25 4.77-4.92 10.51-9.39 17.22-13.46 4.31-2.74 8.22-5.78 11.68-9.18 3.45-3.36 6.19-7.27 8.23-11.69 2.02-4.37 3.04-9.24 3.04-14.62 0-6.4-1.52-11.94-4.57-16.66-3-4.68-7.06-8.28-12.04-10.87-5.03-2.54-10.61-3.81-16.76-3.81-5.53 0-10.81 1.11-15.89 3.45-5.03 2.29-9.25 5.89-12.55 10.77-3.3 4.87-5.23 11.12-5.74 18.74h-32.91c.51-12.95 3.81-23.92 9.85-32.91 6.1-8.99 14.13-15.8 24.08-20.42 10.01-4.62 21.08-6.9 33.16-6.9 13.31 0 24.89 2.43 34.84 7.41 9.96 4.93 17.73 11.83 23.27 20.67 5.48 8.84 8.28 19.1 8.28 30.88 0 8.08-1.27 15.34-3.81 21.79-2.54 6.45-6.1 12.24-10.77 17.27-4.68 5.08-10.21 9.54-16.71 13.41-6.15 3.86-11.12 7.82-14.88 11.93-3.81 4.11-6.56 8.99-8.28 14.58-1.73 5.63-2.69 12.59-2.84 20.92v2.03h-30.94zm16.36 65.82c-5.94-.04-11.02-2.13-15.29-6.35-4.26-4.21-6.35-9.34-6.35-15.33 0-5.89 2.09-10.97 6.35-15.19 4.27-4.21 9.35-6.35 15.29-6.35 5.84 0 10.92 2.14 15.18 6.35 4.32 4.22 6.45 9.3 6.45 15.19 0 3.96-1.01 7.62-2.99 10.87-1.98 3.3-4.57 5.94-7.82 7.87-3.25 1.93-6.86 2.9-10.82 2.94zM417.71 94.29C376.33 52.92 319.15 27.32 256 27.32c-63.15 0-120.32 25.6-161.71 66.97C52.92 135.68 27.32 192.85 27.32 256c0 63.15 25.6 120.33 66.97 161.71 41.39 41.37 98.56 66.97 161.71 66.97 63.15 0 120.33-25.6 161.71-66.97 41.37-41.38 66.97-98.56 66.97-161.71 0-63.15-25.6-120.32-66.97-161.71z"
                ></path>
              </svg>}
                </span>
              </span>
            </div>
            <div className={s.animaltypecontainer}>
            <span className={animal.animal_type == "Crested Gecko" ? s.gecko : s.snake}>
                {animal.animal_type}
            </span>
            </div>
            <div className={s.genescontainer}>
              {animal.animal_gene_traits ? animal.animal_gene_traits.map((gene)=>(
                <span className={s.gene} key={gene}>
                  {gene}
                </span>
              )) : <span className={s.gene}>
                No genes added
                </span>}
            </div>
            
        </div>
        
    </Link>
  )
}
