import React from 'react'
import s from './addChildPage.module.css'
import Layout from '@/components/Layout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import PairingsComponent from '@/components/PairingsComponent/PairingsComponent'
import { useRouter } from 'next/router'
import { useSessionData } from '@/hooks/useSessionData'
import AddChildComponent from '@/components/AddChildComponent/AddChildComponent'
export default function AddChildPage() {
    const router = useRouter()
    const {id} = router.query
    const {data, status} = useSessionData()
    if (status === 'loading') return <div className='w-full h-full min-h-screen'>Loading...</div>;
    if (status === 'error') return <div>Error user</div>;
    if (data.session === null) {
        router.push('/login')
        return <div>Redirecting...</div>
    }

  return (
    <Layout session={data.session}>
    <div className={s.container}>
        <div className={s.sidebar}>
            <Sidebar />
        </div>
        <div className={s.content}>
              <AddChildComponent session={data.session} id={id} />  
        </div>
    </div>
    </Layout>
  )
}
