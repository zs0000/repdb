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
import Sidebar from '@/components/Sidebar/Sidebar';
import { useSessionData } from '@/hooks/useSessionData';
export default function UploadPage() {
   const router = useRouter();

   const {data, status} = useSessionData()

   if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error</div>
    if(!data.session) router.push("/login/")


  return (
    <Layout session={data.session}>
        
       <div className={s.content}>
        {data?.session && <UploadAnimalForm session={data.session}/>}
        </div>
      
    </Layout>
  )
}
