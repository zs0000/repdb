import Layout from '@/components/Layout/Layout'
import s from './PairingsPage.module.css'
import { useSessionData } from '@/hooks/useSessionData'

export default function ProfilePage() {
    const {data, status} = useSessionData()

    if(status === 'loading') return <div>Loading...</div>
    if(status === 'error') return <div>Error</div>

    
    return (
    <Layout session={data.session}>
        <div className={s.container}>
            <div className={s.content}>
            
            </div>
        </div>
    </Layout>
  )
}
