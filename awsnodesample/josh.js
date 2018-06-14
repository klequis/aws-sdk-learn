// from: http://www.joshsgman.com/upload-to-and-get-images-from-amazon-s3-with-node-js/

var AWS = require('aws-sdk');
AWS.config.loadFromPath('pathToJsonFile');
var s3 = new AWS.S3();
var bucketParams = {
  Bucket: 'myBucket'
};
s3.createBucket(bucketParams)
var s3Bucket = new AWS.S3({
  params: {
    Bucket: 'myBucket'
  }
})
var data = {
  Key: imageName,
  Body: imageFile
};
s3Bucket.putObject(data, function(err, data) {
  if (err) {
    console.log('Error uploading data: ', data);
  } else {
    console.log('succesfully uploaded the image!';
  }
});
var urlParams = {
  Bucket: 'myBucket',
  Key: 'imageName'
};
s3Bucket.getSignedUrl('getObject', urlParams, function(err, url) {
  console.log('the url of the image is', url);
})
var params = {
  Bucket: 'myBucket'
};
s3.listObjects(params, function(err, data) {
  var bucketContents = data.Contents;
  for (var i = 0; i < bucketContents.length; i++) {
    var urlParams = {
      Bucket: 'myBucket',
      Key: bucketContents[i].Key
    };
    s3.getSignedUrl('getObject', urlParams, function(err, url) {
      console.log('the url of the image is', url);
    });
  }
});
