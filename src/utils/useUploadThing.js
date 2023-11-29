import { useState } from "react";

import { DANGEROUS__uploadFiles } from "uploadthing/client";

import { useEvent } from "@/utils/useEvent";
import useFetch from "@/utils/useFetch";

const useEndpointMetadata = (endpoint) => {
  const { data } = useFetch("/api/uploadthing");

  // TODO: Log on errors in dev

  return data?.find((x) => x.slug === endpoint);
};

export const useUploadThing = ({
  endpoint,
  onClientUploadComplete,
  onUploadError,
}) => {
  const [isUploading, setUploading] = useState(false);

  const permittedFileInfo = useEndpointMetadata(endpoint);

  const startUpload = useEvent(async (files) => {
    setUploading(true);
    try {
      const res = await DANGEROUS__uploadFiles(files, endpoint);
      setUploading(false);
      if (onClientUploadComplete) {
        onClientUploadComplete(res);
      }
      return res;
    } catch (e) {
      setUploading(false);
      if (onUploadError) {
        onUploadError(e);
      }
      return;
    }
  });

  return {
    startUpload,
    isUploading,
    permittedFileInfo,
  };
};

export const generateReactHelpers = () => {
  return {
    useUploadThing,
    uploadFiles: DANGEROUS__uploadFiles,
  };
};

export const FullFile = (file) => {
  return {
    file: file,
    contents: "", // This needs to be implemented according to your logic
  };
};
