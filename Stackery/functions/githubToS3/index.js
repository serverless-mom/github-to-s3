var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-west-2'
});
const cfnCR = require('cfn-custom-resource');


module.exports = async event => {
  console.log('gatekeeper active')
  return cfnCR.sendSuccess('start', {}, event);
};
