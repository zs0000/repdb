import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { supabase } from '../../lib/supabaseClient';
import AnimalCard from '@/components/AnimalCard/AnimalCard';
import s from './searchPage.module.css';
import Layout from '@/components/Layout/Layout';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useSessionData } from '@/hooks/useSessionData';
import { SearchResultsComponent } from '@/components/SearchResultsComponent/SearchResultsComponent';
import { NextPageContext } from 'next';
import { useParams } from 'next/navigation'

export async function getServerSideProps(NextPageContext) {
    const {type, term, genes} = NextPageContext.query
    let genesArr =["Lilly White"]

    console.log(genesArr)
    if (type && term && genes) {
        return {
            props: {
                type: type,
                term: term,
                genes: [genes],
                length: 1
            }
        }
    } else if (type && term) {
        return {
            props: {
                type: type,
                term: term,
                length: 1
            }
        }
    } else if (type && genes) {
        return {
            props: {
                type: type,
                genes: [genes],
                length: 1
            }
        }
    } else if (term && genes) {
        return {
            props: {
                term: term,
                genes: [genes],
                length: 1
            }
        }
    } else if (type) {
        return {
            props: {
                type: type,
                length: 1
            }
        }
    } else if (term) {
        return {
            props: {
                term: term,
                length: 1
            }
        }
    } else if (genes) {
        return {
            props: {
                genes: [genes],
                length: 1
            }
        }
    } else {
        
return {
    props: {
        length:0
    
}
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
        
            <div className={s.content}>
        <SearchBar />
            <div className={s.resultscontainer}>
            {props && props.length > 0 ? (
                <SearchResultsComponent params={props} />
            ) : (
                <div className={s.noresultscontainer}>
                    No results found.
                    This is a beta feature that will not be included in production but feel free to test it. Currently testing, optimizing, etc.
                </div>
            )}
            
            </div> 
        </div>
        
    </Layout>
  );
}
