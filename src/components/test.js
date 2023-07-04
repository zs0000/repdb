import { useSearchResults } from '../hooks/useSearchQueryData'

export function SearchResultsComponent() {
  const { data, status } = useSearchResults();

    if (status === 'loading') {
    return <p>Loading...</p>;
    }
    if (status === 'error') {
    return <p>Error!</p>;
    }

  return (
    <div>
      {data.data.map(animal => (
        <div key={animal.animal_id}>{animal.name}</div>
      ))}
    </div>
  );
}
