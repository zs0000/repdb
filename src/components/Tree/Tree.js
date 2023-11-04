import TreeBranch from "../TreeBranch/TreeBranch"
import TreeNode from "../TreeNode/TreeNode"
import TreeParent from "../TreeParent/TreeParent"
import TreeSpine from "../TreeSpine/TreeSpine"
import s from "./Tree.module.css"

export default function Tree({generations}) {
  const exampleParents = [
    {
      name: "John Doe",
      id: 1,
      image_url:"https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg",
    },
    {
      name: "Mary Doe",
      id: 2,
      image_url:"https://static-cdn.jtvnw.net/ttv-boxart/2009321156_IGDB-188x250.jpg",
    }
  ]
  const exampleChildren = [
    
      
        [{
      name: "Jane Doe",
      id: 3,
      image_url:"https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg",
    },
    {
      name: "John Doe Jr.",
      id: 4,
      image_url:"https://static-cdn.jtvnw.net/ttv-boxart/2009321156_IGDB-188x250.jpg",
    },
    {
      name: "Jane Doe",
      id: 5,
      image_url:"https://static-cdn.jtvnw.net/ttv-boxart/509658-188x250.jpg",
    },],
    [
      {
        name: "John Doe Jr.",
        id: 65,
        image_url:"https://static-cdn.jtvnw.net/ttv-boxart/2009321156_IGDB-188x250.jpg",
      },
      {
        name: "John Doe Jr.",
        id: 65,
        image_url:"https://static-cdn.jtvnw.net/ttv-boxart/2009321156_IGDB-188x250.jpg",
      }],
    [
      {
        name: "John Doe Jr.",
        id: 65,
        image_url:"https://static-cdn.jtvnw.net/ttv-boxart/2009321156_IGDB-188x250.jpg",
      },
 
    {
      name: "John Doe Jr.",
      id: 75,
      image_url:"https://static-cdn.jtvnw.net/ttv-boxart/2009321156_IGDB-188x250.jpg",
    }],
    

    
  ]
  return (
    <div className={s.container}>
        <div className={s.content}>
            <TreeParent/>
            <TreeSpine generations={exampleChildren}/>
        </div>
    </div>
  )
}
