const AWS = require('aws-sdk');
const fs = require('fs')
const fileName = 'hello.html'
const cfnCR = require('cfn-custom-resource');


const s3 = new AWS.S3();

module.exports = async event {
  console.dir(event);
  const ports = JSON.parse(process.env.STACKERY_PORTS)
  fs.readFile(`./${fileName}`, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
      await cfnCR.sendFailure(err.message, event);
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
        await cfnCR.sendFailure(err.message, event);
      } else {
        console.dir(data);
        await cfnCR.sendFailure(err.message, event);
      }
    })
  });
}
