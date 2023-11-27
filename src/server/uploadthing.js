const { createUploadthing } = require("uploadthing/next-legacy");

const f = createUploadthing();

const auth = (req, res) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async (context) => {
      // This code runs on your server before upload
      const user = await auth(context.req, context.res);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async (context) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", context.metadata.userId);

      console.log("file url", context.file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: context.metadata.userId };
    }),
};

module.exports = { ourFileRouter };
