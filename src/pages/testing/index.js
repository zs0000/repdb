// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
 
import { useUploadThing } from "@/utils/useUploadThing";
import { useCallback, useState } from "react";
 
export default function MultiUploader() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null)
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);
 
  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onStartUpload: () => {
        alert("upload has begun");
      },
      onClientUploadComplete: () => {
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        alert("upload has begun");
      },
    },
  );
 
    const handleSelectImage = (e) => {
      console.log(e.target.files[0])
        setFile(e.target.files[0])
        setFiles(...files, e.target.files[0])
        alert(e.target.files[0])
    }

 
  return (
    <div>
      <input type='file' onChange={(e)=>handleSelectImage(e)}/>

      <button onClick={()=>startUpload(files)}>
        upload
      </button>
    </div>
  );
}