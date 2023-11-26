import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

async function getProfileAnimals(id){
    if (!id) return
    const { data, error } = await supabase
    .from('animals')
    .select(`
        animal_id,
        animal_name,
        animal_type,
        animal_gene_traits,
        animal_gender,
        photos(
            img_url
        )
    `).eq('animal_owned_by_user_id', id)

    if (error) throw error
    return data

}

export function useProfileAnimals(id){
    return useQuery([`${id}-profile-animals`, id], () => getProfileAnimals(id), {
        enabled: !!id,
    })
}