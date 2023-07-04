import React from 'react'
import s from "./MobileBar.module.css"
import Link from 'next/link'
import { GiReptileTail } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'
import { BsGrid } from 'react-icons/bs'
import { MdJoinRight } from 'react-icons/md'
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai'


export default function MobileBar() {
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
                <Link href="/animals" className={s.itemlink}>
                    <AiOutlineSearch className={s.icon}/>
                    <span className={s.text}>Search</span>
                </Link>
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
                <Link href="/search" className={s.itemlink}>
                    <AiOutlinePlusCircle className={s.icon}/>
                    <span className={s.text}>Add Reptile</span>
                </Link>
            </div>
        </div>
    </div>
  )
}
