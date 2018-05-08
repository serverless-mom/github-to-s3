const AWS = require('aws-sdk');
const fs = require('fs')
const fileName = 'hello.html'

const s3 = new AWS.S3();

module.exports = function handler(event, context, callback) {
    console.log(event);
    const ports = JSON.parse(process.env.STACKERY_PORTS)
    fs.readFile(`./${fileName}`, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }
      let params = {
        Body: data,
        Key: `${fileName}`,
        Bucket: ports[0][0].bucket
      };
      console.log(data);
      s3.putObject(params, (err, data) => {
        if (err) {
          console.log(err);
          callback(null, {});
        } else {
          console.dir(data);
          callback(null, {});
        }
      })
    });
