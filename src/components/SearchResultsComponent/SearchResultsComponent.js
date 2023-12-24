import { useSearchResults } from '../../hooks/useSearchQueryData'
import AnimalCard from '../AnimalCard/AnimalCard';
import s from './SearchResultsComponent.module.css'

export function SearchResultsComponent({params}) {
    
  const { data, status } = useSearchResults(params);

    if (status === 'loading') {
    return <p>Loading...</p>;
    }
    if (status === 'error') {
    return <p>Error!</p>;
    }
    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.content}>

      {data  && data.length > 0 ?data.map(animal => (
        <AnimalCard key={animal.id} animal={animal} />
      )) 
    :
    <p>No results found.
      </p>}
    </div>
</div>
  );
}
