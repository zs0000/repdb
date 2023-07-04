import { supabase } from '@/lib/supabaseClient'



//construct query based on parameters
const constructQuery = (term, genes, type) => {
  console.log("hi")
  let query = supabase.from('animals').select('*');
  if (term) query = query.eq('animal_name', `${term}`);
  if (genes) query = query.in('animal_gene_traits', `${genes}`);
  if (type) query = query.eq('animal_type', `${type}`);
  return query;
};

export default async function handler(req, res) {
  console.log(req)
  console.log(req.query)

  if (!term && !genes && !type) {
    return res.status(400).json({ error: 'At least one of term, genes, or type must be provided.' })
  }

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
