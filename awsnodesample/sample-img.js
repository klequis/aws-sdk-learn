// Load the SDK and UUID

//////////////////////////////////////////////////////////
// This is from the doc but did nothing in this example
// var AWS = require('aws-sdk');
// AWS.config.logger = console;
//////////////////////////////////////////////////////////

var S3 = require('aws-sdk/clients/s3')
var shortid = require('shortid');

// Create unique bucket name
var bucketName = 'nodesdksample' + shortid.generate();
// Create name for uploaded object key
var keyName = 'hello_world.txt';

// Create a promise on S3 service object
// var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({
//   Bucket: bucketName,
//   region: 'us-west-2'
// }).promise();
var bucketPromise = new S3({apiVersion: '2006-03-01'}).createBucket({
  Bucket: bucketName,
  region: 'us-west-2'
}).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
  function(data) {
    // Create params for putObject call
    var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    // Create object upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
}).catch(
  function(err) {
    console.error(err, err.stack);
});
