import React from 'react'
import s from "./addchild.module.css"
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { useSessionData } from '@/hooks/useSessionData'
import Sidebar from '@/components/Sidebar/Sidebar'
import PairingsComponent from '@/components/PairingsComponent/PairingsComponent'
export default function AddChildrenPage() {
    const router = useRouter()
    const {data, status} = useSessionData()

    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
    if(data.session === null){
        router.push("/login")
        return <div>Redirecting...</div>
    }


  return (
    <Layout session={data.session}>
    <div className={s.container}>
        <div className={s.sidebar}>
            <Sidebar />
        </div>
        <div className={s.content}>
            <PairingsComponent session={data.session} />
        </div>
    </div>
    </Layout>
  )
}
