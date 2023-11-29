const { generateComponents } = require("@uploadthing/react");
const { ourFileRouter } = require("@/server/uploadthing"); // Adjust the path as needed

const { UploadButton, UploadDropzone, Uploader, useUploadThing } = generateComponents(ourFileRouter);

module.exports = { UploadButton, UploadDropzone, Uploader, useUploadThing };
