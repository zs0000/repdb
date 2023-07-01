import AnimalProfile from '@/components/AnimalProfile/AnimalProfile'
import Layout from '@/components/Layout/Layout'
import { useAnimalData } from '@/hooks/useAnimalData'
import { useSessionData } from '@/hooks/useSessionData'

import { supabase } from '@/lib/supabaseClient'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function AnimalProfilePage() {
  const router = useRouter()
  const { id } = router.query;
  const { data, status } = useSessionData()

  if (status === 'loading') return <div className='w-full h-full min-h-screen'>Loading...</div>;
  if (status === 'error') return <div>Error user</div>;

  return (
    <Layout session={data}>
      <AnimalProfile id={id}/>
    </Layout>
  )
}