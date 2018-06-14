var uuid = require('uuid');

var S3 = require('aws-sdk/clients/s3')

var bucketName = 'photo-app-tvc'
var keyName = 'hello_world.txt';

var s3 = new S3()

var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
s3.upload(params, function(err, data) {
  console.log(err, data);
});
