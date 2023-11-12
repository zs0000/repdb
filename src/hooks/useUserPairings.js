import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';

// The async function to fetch pairings, refactored to be used with react-query
async function fetchPairings(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  // Fetch the pairings from the database
  const { data: pairingsData, error: pairingsError } = await supabase
    .from('pairings')
    .select('pairing_id, female_id, male_id')
    .eq('user_id', userId);

  if (pairingsError) {
    throw pairingsError;
  }

  if (pairingsData.length === 0) {
    return [];
  }

  // Get unique animal IDs from the pairings
  const animalIds = [...new Set(pairingsData.flatMap(p => [p.female_id, p.male_id]))];

  // Fetch the animals from the database
  const { data: animalsData, error: animalsError } = await supabase
    .from('animals')
    .select('animal_id, animal_name, animal_type')
    .in('animal_id', animalIds);

  if (animalsError) {
    throw animalsError;
  }

  // Map animals by their ID for quick access
  const animalsMap = new Map(animalsData.map(a => [a.animal_id, a]));

  // Enrich pairings with animal details
  const enrichedPairings = pairingsData.map(pairing => ({
    ...pairing,
    female: animalsMap.get(pairing.female_id),
    male: animalsMap.get(pairing.male_id),
  }));

  return enrichedPairings;
}

// The custom hook to use with your React components
export function useUserPairings(userId) {
  return useQuery(
    [`${userId}-pairings-data`, userId],
    () => fetchPairings(userId),
    {
      // The query will not execute until the userId exists
      enabled: !!userId,
      // Here you can add other react-query options like `staleTime`, `cacheTime`, etc.
    }
  );
}
