import getCroppedImg from '@/utils/cropImage'
import Image from 'next/image'
import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { BsCameraFill } from 'react-icons/bs'

const Demo = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, rotation, selectedImage])

  const onClose = useCallback(() => {
    setCroppedImage(null)
  }, [])


  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => setSelectedImage(reader.result))
    }
  }


  return (
    <div className='w-full h-full'>
      <div>
        <input type='file' onChange={onFileChange} accept='image/*' />
      </div>
       <button  onClick={showCroppedImage}>
        show cropped image
      </button>
    <div className='w-full h-full min-h-screen relative '>
     
    
{croppedImage == null  ? <Cropper
      image={selectedImage || ''}
      crop={crop}
      zoom={zoom}
      aspect={1/1}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
    :
    <div className=" w-full h-[40vh] md:h-[50vh] flex flex-col items-center bg-zinc-100">
                    <div className={"w-[50%] h-full flex justify-center items-center"}>
                    
                    { selectedImage ? <Image src={selectedImage} alt="listing photo" width={500} height={500} className={"w-[100%] h-[100%] object-cover object-center"} /> : <BsCameraFill className={"w-[20vw] h-[20vh] text-gray-300 "} />}
                    </div>
                    
                </div>
  }
  
       
      
    </div>
</div>
  )
}

export default Demo