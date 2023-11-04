import Layout from '@/components/Layout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import { useSessionData } from '@/hooks/useSessionData'
import { useRouter } from 'next/router'
import React from 'react'
import s from "./tree.module.css"
import Tree from '@/components/Tree/Tree'


import TreeAnimalSelector from '@/components/TreeAnimalSelector/TreeAnimalSelector'

export default function TreePage() {
    const router = useRouter()
    //grab pairing id from url
    const {id} = router.query

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
            <TreeAnimalSelector id={id} session={data.session} />
            <Tree>

            </Tree>
        </div>
    </div>
    </Layout>
  )
}
