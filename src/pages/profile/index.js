import React from 'react'
import s from './profilePage.module.css'
import Layout from '@/components/Layout/Layout'
import { useSessionData } from '@/hooks/useSessionData'
import Sidebar from '@/components/Sidebar/Sidebar'
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import MyProfileCard from '@/components/MyProfileCard/MyProfileCard'
export default function ProfilePage() {
    const {data, status} = useSessionData()
   
    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'error') {
        return <div>Error</div>
    }
    console.log(data.session.user.id)
  return (
    <Layout session={data.session}>
        <div className={s.container}>
            <div className={s.sidebar}>
                <Sidebar />
            </div>
            <div className={s.content}>
                <MyProfileCard id={data.session.user.id}/>
            </div>
        </div>
    </Layout>
  )
}
