const AWS = require('aws-sdk');
const fs = require('fs');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

function uploadImage(file, title) {
  let s3 = new AWS.S3();

  //configuring parameters
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fs.createReadStream(`./server/uploads/${file.filename}`),
    Key: `${title}/${Date.now()}_${file.originalname}`
  };

  return new Promise(
    (resolve, reject) => {
      s3.upload(params, function (err, data) {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve(data.Location);
        }
      });
    });
}

module.exports = uploadImage;