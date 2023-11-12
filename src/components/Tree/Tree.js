import { useTreeData } from "@/hooks/useOptimizedTreeData"
import TreeBranch from "../TreeBranch/TreeBranch"
import TreeNode from "../TreeNode/TreeNode"
import TreeParent from "../TreeParent/TreeParent"
import TreeSpine from "../TreeSpine/TreeSpine"
import s from "./Tree.module.css"
import { useState } from "react"

export default function Tree({id}) {
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
  const [parents, setParents] = useState([])
  const [children, setChildren] = useState([])
  const {data, status} = useTreeData(id)
  if(status === "loading") return <div>Loading...</div>
  if(status === "error") return <div>Error...</div>

  console.log(data, "data")

  return (
    <div className={s.container}>
        <div className={s.content}>
            <TreeParent id={id} parents={data.parents}/>
            <TreeSpine id={id} generations={data.generations}/>
        </div>
    </div>
  )
}
