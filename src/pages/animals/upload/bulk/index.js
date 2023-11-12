import React from 'react'
import s from "./uploadbulk.module.css"
import Sidebar from '@/components/Sidebar/Sidebar'
import Layout from '@/components/Layout/Layout'
import { useRouter } from 'next/router'
import { useSessionData } from '@/hooks/useSessionData'

import { useState } from 'react';

export default function BulkUploadPage() {
  const router = useRouter()

  const {data, status} = useSessionData()
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const filesArray = Array.from(e.dataTransfer.files);
    if (filesArray.length > 25) {
      alert("Please upload 25 photos maximum.");
      return;
    }
    setFiles(filesArray);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if(status === "loading") return <div>Loading...</div>
  if(status === "error") return <div>Error...</div>
  if(data.session === null){
    router.push("/login")
    return <div>Redirecting...</div>
  }
    return (
    <Layout session={data.session}>
    <div className={s.container}>
       <div className={s.sidebar}>
       <Sidebar />
       </div>
        <div className={s.content}>
          <div className={s.uploadcontainer}>
            <div
              className={s.dragarea}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className={s.dragtext}>
                <h3>Drag and Drop files here</h3>
              </div>
            </div>
            <div>
              {files.length > 0 &&  files.length}
              {files.map((file) => (
                <div key={file.name}>{file.name}
                <div>
                  <img src={URL.createObjectURL(file)} alt={file.name} />
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
    </Layout>
  )
}
