import { SessionProvider } from '@/context/SessionContext'
import '@/styles/globals.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
 
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
      <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
