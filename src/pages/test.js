import { useS3Upload,  getImageData } from "next-s3-upload";
import Image from "next/image";
import { useState } from "react";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  let { uploadToS3 } = useS3Upload();

  let handleFileChange = async event => {
    let file = event.target.files[0];
    let { url } = await uploadToS3(file);
    let { height, width } = await getImageData(file);
    setWidth(width);
    setHeight(height);

    setImageUrl(url);

    console.log("Successfully uploaded to S3!", imageUrl);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageUrl && <Image src={imageUrl} width={width} height={height} alt=""/>}
    </div>
  );
}