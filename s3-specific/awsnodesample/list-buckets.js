var S3 = require('aws-sdk/clients/s3')

var listBucketsPromise = new S3({apiVersion: '20060301'}).listBuckets().promise()

listBucketsPromise.then(
  function(data) {
    console.log(data)
  }
).catch(
  function(err) {
    console.log(err, err.stack)
  }
)
