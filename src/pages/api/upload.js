


export default function handler(req, res) {
// create image upload for amazon s3
// https://dev.to/ryuuto829/uploading-images-to-s3-using-next-js-api-routes-3bhi
axios.post('/api/upload', {
    data: {
        file: req.body.file,
    },
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})
.then((response) => {
    console.log(response);
})
.catch((error) => {
    console.log(error);
});

}