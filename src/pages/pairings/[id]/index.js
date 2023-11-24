import React from 'react'
import s from './PairingsPage.module.css'
import Sidebar from '@/components/Sidebar/Sidebar'
import Layout from '@/components/Layout/Layout'
import { useSessionData } from '@/hooks/useSessionData'
import PairingPageComponent from '@/components/PairingPageComponent/PairingPageComponent'
import { useRouter } from 'next/router'

export default function PairingsPage() {
    const router = useRouter()
    const {id} = router.query
    const{data, status} = useSessionData()

    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
    if(data.session === null){
        router.push("/login")
        return <div>Redirecting...</div>
    }

    return (
    <Layout session={data.session}>
    
        <div className={s.content}>
        <PairingPageComponent id={id} session={data.session}/>
        </div>

    </Layout>
  )
}
