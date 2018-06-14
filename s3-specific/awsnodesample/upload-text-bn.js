
//////////////////////////////////////////////////////////
// Create a logger
// var AWS = require('aws-sdk');
// AWS.config.logger = console;
//////////////////////////////////////////////////////////

var uuid = require('uuid');

var S3 = require('aws-sdk/clients/s3')

// Create unique bucket name
// var bucketName = 'node-sdk-sample-' + uuid.v4();
var bucketName = 'photo-app-tvc'
// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
// var bucketPromise = new S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

var s3 = new S3()

// Handle promise fulfilled/rejected states

function upload() {
  // Create params for putObject call
  var objectParams = {
    Body: 'Hello World!',
    Bucket: bucketName,
    Key: keyName,
  }
  // Create object upload promise
  var uploadPromise = new S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise()
  uploadPromise.then(
    function(data) {
      console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });
}

upload()
