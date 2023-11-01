import { supabase } from '@/lib/supabaseClient'



//construct query based on parameters
// construct query based on parameters
const constructQuery = (term, genes, type) => {
  console.log("hi")
  let query = supabase.from('animals')
  .select(`
    *,
    photos (
      img_url
    )
  `)

  if (term) query = query.eq('animal_name', term);
  
  if (type) query = query.eq('animal_type', type);
  
  return query;
};


export default async function handler(req, res) {
  const { term, genes, type } = req.query; 


  console.log(req.query)



  try {
    
    console.log("reached")

    const { data, error } = await constructQuery(term, genes, type)
      console.log(data)
    if (error) {
      throw error
    }

    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
