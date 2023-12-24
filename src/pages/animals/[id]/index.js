import AnimalProfile from '@/components/AnimalProfile/AnimalProfile'
import Layout from '@/components/Layout/Layout'

import { useSessionData } from '@/hooks/useSessionData'

import s from "./AnimalProfilePage.module.css"
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar/Sidebar'
import Head from 'next/head'

export default function AnimalProfilePage() {
  const router = useRouter()
  const { id } = router.query;
  const { data, status } = useSessionData()

  if (status === 'loading') return <div className='w-full h-full min-h-screen'>Loading...</div>;
  if (status === 'error') return <div>Error user</div>;

  console.log(data)
  return (
    <Layout session={data.session}>
        
        <div className={s.content}>
        <AnimalProfile id={id}/>
        </div>
      
    </Layout>
  )
}
