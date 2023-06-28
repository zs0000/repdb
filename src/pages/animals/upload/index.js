import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router';
import Image from 'next/image'
import {BsCameraFill} from "react-icons/bs"
import { supabase } from '@/lib/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useReducer, useState } from 'react';
import { getImageData, useS3Upload } from "next-s3-upload";
import UploadAnimalForm from '@/components/UploadAnimalForm/UploadAnimalForm';
import s from "./upload.module.css"
export default function UploadPage() {
    const [session, setSession] = useState(null)
    const [fetching, setFetching] = useState(true)
    const router = useRouter()
  
    const handleFetchSession = async () => {
      const {data, error} = await supabase.auth.getSession()
      if (data) {
        setSession(data.session)
      }
      return data
    }
  
    const {data, error, isLoading} = useQuery({queryKey:['sessiondata'], queryFn:handleFetchSession})
  
    if(!session || isLoading) return <div>Loading...</div>
    if(session===null || session=== undefined) return router.push('/login')
  return (
    <Layout session={session}>
        <div className={s.content}>
        {session && <UploadAnimalForm session={session}/>}
        </div>
    </Layout>
  )
}
