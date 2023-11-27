const { generateComponents } = require("@uploadthing/react");
const { ourFileRouter } = require("@/server/uploadthing"); // Adjust the path as needed

const { UploadButton, UploadDropzone, Uploader } = generateComponents(ourFileRouter);

module.exports = { UploadButton, UploadDropzone, Uploader };
