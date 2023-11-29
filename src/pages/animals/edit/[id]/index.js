import AnimalEditComponent from '@/components/AnimalEditComponent/AnimalEditComponent'
import s from './AnimalEditPage.module.css'
import { useSessionData } from '@/hooks/useSessionData'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout/Layout'

export default function AnimalEditPage() {

    const {data, status} = useSessionData()
    const router = useRouter()
    const { id } = router.query 
    if (status === 'loading') {
        return <div>Loading...</div>
    }
    if (status === 'error') {
        return <div>Error</div>
    }
    if (!data.session) {
        router.push('/login')
        return <div>Not logged in</div>
    }


  return (
    <Layout session={data.session}>
    <div className={s.container}>
        <AnimalEditComponent id={id} session={data.session} />
    </div>
    </Layout>
  )
}
