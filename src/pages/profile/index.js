import React from 'react'
import s from './profilePage.module.css'
import Layout from '@/components/Layout/Layout'
import { useSessionData } from '@/hooks/useSessionData'
import Sidebar from '@/components/Sidebar/Sidebar'
export default function ProfilePage() {
    const {data, status} = useSessionData()

    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'error') {
        return <div>Error</div>
    }

  return (
    <Layout session={data.session}>
        <div className={s.container}>
            <div className={s.sidebar}>
                <Sidebar />
            </div>
            <div className={s.content}>
                
            </div>
        </div>
    </Layout>
  )
}
