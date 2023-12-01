import React from 'react'
import s from "./Sidebar.module.css"
import Link from 'next/link'
import { GiReptileTail } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { BsGrid } from 'react-icons/bs'
import { MdJoinRight } from 'react-icons/md'
import { AiOutlineLogout, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
export default function Sidebar({session}) {

  const router = useRouter()
  async function handleSignout() {
    supabase.auth.signOut()
    router.push('/')
  }

  if(session?.user.username === undefined || session?.user.username === null || session?.user.username === ""){
    router.push('/dashboard')
  }
  return (
    <div className={s.container}>
            
            <div className={s.items}>
                <div className={s.item}>
                    <Link href="/dashboard" className={s.itemlink}>
                      <BsGrid className={s.icon}/>
                    <span className={s.text}>
                    Dashboard
                    </span>
                    </Link>
                </div>
                <div className={s.item}>
                    <Link href="/search" className={s.itemlink}>
                      <AiOutlineSearch className={s.icon}/>
                      <span className={s.text}>Search</span>
                    </Link>
                </div>
                <div className={s.spacer}>
                  
                </div>
                <div className={s.item}>
                    <Link href={`/profile/${session?.user?.username}`} className={s.itemlink}>
                      <CgProfile className={s.icon}/>
                      <span className={s.text}>
                      My Profile
                      </span>
                    </Link>
                </div>
                <div className={s.item}>
                    <Link href="/animals" className={s.itemlink}>
                      <GiReptileTail className={s.icon}/>
                      <span className={s.text}>My Reptiles</span>
                    </Link>
                </div>
                <div className={s.item}>
                    <Link href="/pairings" className={s.itemlink}>
                      <MdJoinRight className={s.icon}/>
                    <span className={s.text}>
                    My Pairings
                    </span>
                    </Link>
                </div>
                <div className={s.spacer}>
                  
                </div>
                <div className={s.item}>
                    <Link href="/animals/upload" className={s.itemlink}>
                      <AiOutlinePlusCircle className={s.icon}/>
                      <span className={s.text}>
                    New Reptile

                    </span>
                    </Link>
                </div>
                <div className={s.item}>
                    <button onClick={()=>{supabase.auth.signOut()
                      router.push('/')}} className={s.itemlink}>
                      <AiOutlineLogout className={s.icon}/>
                      <span className={s.text}>
                    Sign out

                    </span>
                    </button>
                </div>
                
            </div>
   </div>
  )
}
