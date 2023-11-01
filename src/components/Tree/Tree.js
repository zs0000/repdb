import TreeBranch from "../TreeBranch/TreeBranch"
import TreeNode from "../TreeNode/TreeNode"
import TreeParent from "../TreeParent/TreeParent"
import TreeSpine from "../TreeSpine/TreeSpine"
import s from "./Tree.module.css"

export default function Tree() {
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
            <TreeParent/>
            <TreeSpine generations={generations}/>
        </div>
    </div>
  )
}
