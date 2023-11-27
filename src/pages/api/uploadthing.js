const { createNextPageApiHandler } = require("uploadthing/next-legacy");
const { ourFileRouter } = require("@/server/uploadthing"); // Adjust the path as needed

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

module.exports = handler;
