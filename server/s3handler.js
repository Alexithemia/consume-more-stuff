const AWS = require('aws-sdk');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

function uploadImage(file, title, filename) {
  let s3 = new AWS.S3();

  //configuring parameters
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: file,
    Key: `${title}/${Date.now()}_${filename}` // todo
  };

  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Uploaded in:", data.Location);
    }
  });
}

module.exports = uploadImage;