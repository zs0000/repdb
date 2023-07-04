
import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getAnimalPairingsData(animal) {

    if(animal.animal_gender === "Male"){
       // grab pairings and the female_id's to use to grab animals by animal_id as well as photos
       const { data, error } = await supabase
    .from('pairings')
    .select(`
        *,
        animals!pairings_female_id_fkey (
            *,
            photos (
                img_url
            )
        )
    `)
    .eq('male_id', animal.animal_id)
    if (error) throw error;
    return data;
    } else if(animal.animal_gender === "Female"){
        const { data, error } = await supabase
        .from('pairings')
        .select(`
            *,
            animals!pairings_male_id_fkey (
                *,
                photos (
                    img_url
                )
            )
        `)
        .eq('female_id', animal.animal_id)

        if (error) throw error;

        return data;
    }

    return {
        data: null,
        length: 0
    }
 
}

export function useAnimalPairingsData(animal) {
    return useQuery(['animalPairingsData', animal.animal_id], () => getAnimalPairingsData(animal), {
      enabled: !!animal.animal_id, // Only run the query if the `id` is not `null` or `undefined`
    });
  }