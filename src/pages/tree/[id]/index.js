import Layout from '@/components/Layout/Layout'
import Sidebar from '@/components/Sidebar/Sidebar'
import Tree from '@/components/Tree/Tree'
import TreeAnimalSelector from '@/components/TreeAnimalSelector/TreeAnimalSelector'
import { useSessionData } from '@/hooks/useSessionData'
import { useRouter } from 'next/router'
import s from "./CustomTreePage.module.css"
import React from 'react'

export default function CustomTreePage() {
  const router = useRouter()
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
         
          <Tree id={id}>

          </Tree>
      </div>
  </div>
  </Layout>
)
}
