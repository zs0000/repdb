import React from 'react'
import s from "./testPage.module.css"
import TreeParent from '@/components/TreeParent/TreeParent'
import Tree from '@/components/Tree/Tree'
export default function Test() {
  const generations = [
   
    [
      {
        name: "Child 1",
        color: "blue",
        mate:{
          name: "Mate 1",
          color: "pink",
        }
      },
      {
        name: "Child 2",
        color: "blue",
        mate:{
          name: "Mate 2",
          color: "pink",
        }
      },
      {
        name: "Child 3",
        color: "blue",
        mate:{
          name: "Mate 3",
          color: "pink",
        }
      },
    ] 
  ,
  [
      {
        name: "Child 5",
        color: "blue",
        mate:{
          name: "Mate 3",
          color: "pink",
        }
      },
      {
        name: "Child 6",
        color: "blue",
        mate:{}
      },
    ] 

]
  return (
    <div className={s.container}>
        <div className={s.content}>
            <Tree generations={generations}>
            </Tree>
        </div>
    </div>
  )
}
