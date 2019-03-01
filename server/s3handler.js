const AWS = require('aws-sdk');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

function uploadImage(file, title) {
  console.log(file);

  let s3 = new AWS.S3();

  //configuring parameters
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file.path,
    Key: `${title}/${Date.now()}_${file.originalname}` // todo
  };

  return new Promise(
    (resolve, reject) => {
      s3.upload(params, function (err, data) {
        //handle error
        if (err) {
          reject(err);
        }

        //success
        if (data) {
          console.log('returning');

          resolve(data.Location);
        }
      });
    });
}

module.exports = uploadImage;