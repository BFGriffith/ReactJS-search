// Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');

// create instance of Express:
var app = express();
var PORT = process.env.PORT || 3000; // PORT for listener

// Morgan for more semantic and informative logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// MongoDB configuration (Change this URL to your own DB)
var databaseUrl = "ReactSearches";
var collections = ["articles"];

// use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

db.on('error', function (err) {
  console.log('MongoDB Error: ', err);
});

// Main route which will redirect to the rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// listener:
app.listen(PORT, function() {
  console.log("Application listening on PORT: " + PORT);
});
