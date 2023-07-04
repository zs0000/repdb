import React from 'react'
import s from "./Sidebar.module.css"
import Link from 'next/link'
import { GiReptileTail } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { BsGrid } from 'react-icons/bs'
import { MdJoinRight } from 'react-icons/md'
import { AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
export default function Sidebar() {
  return (
    <div className={s.container}>
            <div className={s.topcontainer}>
            <svg className='w-24 h-24 rounded-lg mb-2 flex justify-center items-center'
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 100 100"
    >
      <mask id="viewboxMask">
        <rect width="100" height="100" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path fill="#f88c49" d="M0 0H100V100H0z"></path>
        <path
          fill="#0a5b83"
          d="M95 53.33C95 29.4 74.85 10 50 10S5 29.4 5 53.33V140h90V53.33z"
          transform="rotate(12 31.471 76.757)"
        ></path>
        <path
          fill="#fff"
          d="M13 8c0 1.66-1.12 3-2.5 3S8 9.66 8 8s1.12-3 2.5-3S13 6.34 13 8zm21 0c0 1.66-1.12 3-2.5 3S29 9.66 29 8s1.12-3 2.5-3S34 6.34 34 8z"
          transform="rotate(12 31.471 76.757) translate(29 33) rotate(20 46.692 -15.692) translate(0 4)"
        ></path>
        <path
          fill="#fff"
          d="M15 11C4.52 11 2.42 2.82 3.12 2.14 3.82 1.46 8.02 3.5 15 3.5c6.99 0 11.18-2.04 11.88-1.36.7.68-1.4 8.86-11.88 8.86z"
          transform="rotate(12 31.471 76.757) translate(29 33) rotate(20 46.692 -15.692) translate(6 24)"
        ></path>
      </g>
    </svg>
            </div>
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
                    <Link href="/profile" className={s.itemlink}>
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
                    <Link href="/animals/pairings" className={s.itemlink}>
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
                
            </div>
   </div>
  )
}
