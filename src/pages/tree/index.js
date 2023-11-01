import React from 'react'
import s from "./testPage.module.css"
import TreeParent from '@/components/TreeParent/TreeParent'
import Tree from '@/components/Tree/Tree'
export default function Test() {
  
  return (
    <div className={s.container}>
        <div className={s.content}>
            <Tree>
            </Tree>
        </div>
    </div>
  )
}
