import multer from 'multer';
import multerS3 from 'multer-s3';


const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    acl: 'public-read', // if you want the uploaded files to be publicly accessible
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // use Date.now() for unique file keys
    },
  }),
});

module.exports = upload;
