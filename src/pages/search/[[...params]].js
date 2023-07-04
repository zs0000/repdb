import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { supabase } from '../../lib/supabaseClient';
import AnimalCard from '@/components/AnimalCard/AnimalCard';
import s from './searchPage.module.css';
import Layout from '@/components/Layout/Layout';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useSessionData } from '@/hooks/useSessionData';
import { SearchResultsComponent } from '@/components/test';
import { NextPageContext } from 'next';
import { useParams } from 'next/navigation'

export async function getServerSideProps(NextPageContext) {
    const {type, term, genes} = NextPageContext.query

    const buildQuery = () => {
        let query = supabase.from('animals').select('*')
        if (term) query = query.ilike('animal_name', `%${term}%`)
        if (genes) query = query.ilike('animal_gene_traits', `%${genes}%`)
        if (type) query = query.ilike('animal_type', `%${type}%`)
        return query
    }
    const res = await buildQuery()
   
   
    console.log(res)
    return {
        props: {
            res
        }

    }
}
export default function Search(props) {
    console.log(props)
  const [results, setResults] = useState([]);

    const {data, status} = useSessionData()
    const params = useParams()
   

    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'error') {
        return <div>Error!</div>
    }
    
  return (
    <Layout session={data.session}>
        <div className={s.container}>
            <div className={s.sidebar}>
                <Sidebar />
            </div>
            <div className={s.content}>
        <SearchBar />
            <div className={s.resultscontainer}>
            {results && results.length > 0 ? (
            <ul className={s.results}>
                {results.map((animal) => (
                    <AnimalCard key={animal.id} animal={animal} />
                ))}
            </ul>
            ) : (
                <p>No results found.</p>
            )}
            <SearchResultsComponent />
            </div> 
        </div>
        </div>
    </Layout>
  );
}
