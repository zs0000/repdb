import React from 'react'
import s from './index.module.css'
import Layout from '@/components/Layout/Layout'
import { useSessionData } from '@/hooks/useSessionData'

export default function UploadPairing() {
  const {data, status} = useSessionData()

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error</div>
 
  return (
    <Layout session={data.session}>
      <div className={s.container}>
      
      </div>
    </Layout>
  )
}
 