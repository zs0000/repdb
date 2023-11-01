import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getSearchResults(params) {
  console.log(params)

  let qMatch={}
  let geneObj={}
  let genesToObject = {}
  if(params.genes){
    genesToObject = `{${params.genes.join(',')}}`
  }
  
 
  const checkParams = (params) => {
    if(params.term && params.type && params.genes){
      qMatch = {
        "animal_name": params.term,
        "animal_type": params.type,
        "animal_gene_traits": genesToObject
      }
    } else if(params.term && params.type){
      qMatch = {
        "animal_name": params.term,
        "animal_type": params.type
      }
    } else if(params.term && params.genes){
      qMatch = {
        "animal_name": params.term,
        "animal_gene_traits": genesToObject
      }
    } else if(params.type && params.genes){
      qMatch = {
        "animal_type": params.type,
        "animal_gene_traits": genesToObject
      }
    } else if(params.term){
      qMatch = {
        "animal_name": params.term
      }
    } else if(params.type){
      qMatch = {
        "animal_type": params.type
      }
    } else if(params.genes){
      qMatch = {
        "animal_gene_traits": genesToObject
      }
    }
  }
  checkParams(params)
  console.log(qMatch)

  if(params.term && params.type && params.genes){
    const {
      data, error
    } =  await supabase
    .from('animals')
    .select(`*,
    photos (
      img_url
      )`)
    .eq('animal_type', params.type)
    .eq('animal_name', params.term)
    .in('animal_gene_traits', params.genes)
      console.log(error)
    if (err) {
      console.error(err.message)
  } else{
    return data
  }
}else if(params.genes && params.type){
  console.log(params.genes);

  const { data, error } = await supabase
  .from('animals')
  .select(`
      *,
      photos (
      img_url
      )
  `)
  .eq('animal_type', params.type)  // You missed this line
  .contains('animal_gene_traits', params.genes);

  console.log(data);
  console.error(error);  // use console.error to log errors

  if (error) {
      // Handle the error properly. You may want to throw it, or return a value that represents an error.
      console.error('Error fetching search results:', error);
      throw error;
  } else {
      return data;
  }
}
else if (params.type && params.term){
  const {
    data, error
  } =  await supabase
  .from('animals')
  .select(`*,
  photos (
    img_url
    )`)
  .eq('animal_type', params.type)
  .ilike('animal_name', params.term)
  return data


} else if(params.type){
  const {
    data, error
  } =  await supabase
  .from('animals')
  .select(`*,
  photos (
    img_url
    )`)
  .eq('animal_type', params.type)
 
  return data

} else if(params.term){
  const {
    data, error
  } =  await supabase
  .from('animals')
  .select(`*,
  photos (
    img_url
    )`)
  .match(qMatch)
  return data
}
}


export function useSearchResults(params) {
    return useQuery([`${params}-search-resuls`,params], () => getSearchResults(params), {
      enabled: !!params, // Only run the query if the `params` is not `null` or `undefined`
    });
  }