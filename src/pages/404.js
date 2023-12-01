import Navbar from "@/components/Navbar/Navbar";
import { useSessionData } from "@/hooks/useSessionData";


export default function Custom404() {
   {/*
     const {data, status} = useSessionData()
    if(status === "loading") return <div>Loading...</div>
    if(status === "error") return <div>Error...</div>
*/}

  return (
    <div className="w-full h-screen flex flex-col items-center">
        <div className="w-full">
            <Navbar />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-6xl font-bold">Uh-oh</div>
            <div className="text-2xl font-bold">Page Not Found</div>
            
        </div>
    </div>
  )
}
