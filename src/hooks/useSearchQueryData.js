import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

// Helper function to construct the query based on parameters
const constructQuery = (type, gene) => {
  let query = supabase.from('animals').select('*');
  if (type) query = query.ilike('animal_type', type);
  if (gene) query = query.ilike('gene', gene);
  return query;
};

export const useSearchResults = () => {
  const router = useRouter();
  const { type, gene } = router.query;

  const fetchSearchResults = async () => {
    const { data, error } = await constructQuery(type, gene);
    if (error) {
      console.error(error.message);  // Error handling
      return { data: null, error };  // Consistent return shape on error
    }
    return { data, error: null };  // Consistent return shape on success
  };

  return useQuery(['searchResults', type, gene], fetchSearchResults, {
    enabled: !!type || !!gene, // Only run the query if `type` or `gene` is defined.
  });
};
