const AWS = require('aws-sdk');
const fs = require('fs');

console.log(process.env.AWS_ACCESS_KEY_ID);
console.log(process.env.AWS_SECRET_ACCESS_KEY);

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.update({ region: 'us-west-2' });

function uploadImage(file, title) {
  let s3 = new AWS.S3();

  console.log(`title is: ${ title }`);
  console.log(`file.originalname is: ${ file.originalname }`);

  //configuring parameters
  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fs.createReadStream(`./server/uploads/${file.filename}`),
    Key: `${title}/${Date.now()}_${file.originalname}`
  };

  return new Promise(
    (resolve, reject) => {
      s3.upload(params, function (err, data) {
        fs.unlink(`./server/uploads/${file.filename}`, function (err) {
          if (err) {
            console.error(err);
          }
        });
        if (err) {
          console.log(err);
          reject(err);
        }
        if (data) {
          resolve(data.Location);
        }
      });
    });
}

module.exports = uploadImage;