var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var S3 = require('aws-sdk/clients/s3')

var bucketName = 'photo-app-tvc'


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();
  // console.log('form', form);
  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    console.log('file.path', file.path);
    var newFileName = path.join(form.uploadDir, file.name)
    fs.rename(file.path, newFileName, function () {
      console.log('new name', newFileName);
      fs.readFile(newFileName, (err, data) => {
        console.log('data', data);
        if (err) throw err;
        var s3 = new S3()
        var params = {Bucket: bucketName, Key: file.name, Body: data}
        s3.upload(params, function(err, data) {
          console.log('done', err, data);
        });
      });

    });

  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});
